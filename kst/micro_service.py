import sys
import json
import pandas as pd
from flask_cors import CORS
from flask import Flask, request, jsonify, make_response
from collections import defaultdict

from learning_spaces.kst import iita, iita_exclude_transitive, stochastic_markov_sotis, imp2state, simu

sys.path.append('learning_spaces/')

app = Flask(__name__)
CORS(app)


@app.route("/", methods=['POST'])
def default_example():
    data_frame = pd.DataFrame({'a': [1, 0, 1], 'b': [0, 1, 0], 'c': [0, 1, 1]})
    print("\n--------------------------------\n", data_frame, "\n--------------------------------\n")
    response = iita(data_frame, v=1)
    print("\n--------------------------------\n", response, "\n--------------------------------\n")
    return pd.Series(response).to_json(orient='values')


@app.route('/products', methods=['GET'])
def products():
    if request.method == 'GET':
        products = [{"id": "1", "name": "name"}, {"id": "2", "name": "name2"}]
        return json.dumps(products)


@app.route("/iita", methods=['POST'])
def iita_endpoint():
    data_frame = pd.DataFrame(request.json)
    print("\n--------------------------------\n", data_frame.to_json(orient='split'), "\n--------------------------------\n")
    response = iita_exclude_transitive(data_frame, v=1)
    print("\n--------------------------------\n", response, "\n--------------------------------\n")
    return pd.Series(response).to_json(orient='index')


@app.route("/stochastic_markov", methods=['POST'])
def stochastic_markov_endpoint():
    request_body = request.json
    request_body = defaultdict(None, request_body)

    states = {}
    for state in request_body['KnowledgeStates']:
        states[tuple(state['ProblemIds'])] = state['Probability']
    
    new_states, new_problem, final_state_reached = stochastic_markov_sotis.stochastic_markov_sotis(states, 
        request_body["Threshold"], request_body["ProblemId"], request_body["IsAnswerCorrect"])
    
    response_states = []
    for state, probability in new_states.items():
        response_states.append({'ProblemIds': list(state), 'Probability': probability})

    return json.dumps({
            'KnowledgeStates': response_states,
            'ProblemId': new_problem,
            'IsFinalStateReached': bool(final_state_reached)
        })


@app.route("/states", methods=['POST'])
def get_states():
    request_body = request.json
    result = imp2state([tuple(item) for item in request_body['implications']], request_body['number_of_problmes'])
    return json.dumps({
            'states': [[int(l) for l in list(ll)] for ll in list(result)]  # need to convert numpy int8 to python int
        })


@app.route("/simu", methods=['POST'])
def simulate_data():
    request_body = request.json
    result = simu(request_body['number_of_problems'], 
                  request_body['number_of_test_results'], 
                  request_body['ce_probability'], 
                  request_body['lg_probability'], 
                  request_body['delta'],
                  [tuple(imp) for imp in request_body['implications']])

    simu_df = pd.DataFrame(result['dataset'], columns=['0', '1', '2', '3', '4', '5', '6'])
    response = iita_exclude_transitive(simu_df, v=1)
    return pd.Series(response).to_json(orient='index')
    
if __name__ == "__main__":
  app.run(host="localhost", port=7777)