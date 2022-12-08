import sys
import json
import pandas as pd
from flask_cors import CORS
from flask import Flask, request, jsonify, make_response

from learning_spaces.kst import iita, iita_exclude_transitive, stochastic_markov_sotis

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


@app.route("/stohastic_markov", methods=['POST'])
def iita_endpoint():
    '''
    {
        states: [
            {
                problems: ['a', 'b'],
                probability: 0.125
            },
            {}
        ],
        question: 'some question',
        is_answer_correct: True,
        threshold: 0.8
    }
    '''
    r = request.json
    states = {}
    for state in r.states:
        states[tuple(state['problems'])] = state['probability']
    
    new_states, new_question, final_state_reached = stochastic_markov_sotis(states, r.threshold, r.question, r.is_answer_correct)
    
    response_states = []
    for state, probability in new_states.items():
        response_states.append({'problems': list(state), 'probability': probability})
    
    return json.dumps({
        'states': response_states,
        'question': new_question,
        'final_state_reached': final_state_reached
    })



if __name__ == "__main__":
  app.run(host="localhost", port=7777)