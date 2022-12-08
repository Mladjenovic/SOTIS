import operator
import random
from typing import Tuple

import numpy as np

def _array2dict_vals(array: np.ndarray, dict: dict):
    for i, key in enumerate(dict):
        dict[key] = array[i]

def _scale_probabilites(states: dict[Tuple[str], float]):
    probabilites = np.array(list(states.values()))
    probabilites /= sum(probabilites)
    _array2dict_vals(probabilites, states)

def _likeliest_state(states: dict[Tuple[str], float]) -> Tuple[Tuple[str], float]:
    """
    Returns likeliest state and its probability.
    :return: (state, probability)
    """
    return max(states.items(), key=operator.itemgetter(1))

def questioning_rule(states: dict[Tuple[str], float]) -> str:
    """
    :param states: dictionary mapping states (sets of problems/questions) to probabilities
    :return: question to be asked
    """
    if not np.isclose(1, sum(states.values()), atol=0.01):
        raise ValueError('Probabilities do not add up to 1!')

    state, _ = _likeliest_state(states)
    print('Chosen state:', state)
    return random.choice(state)

def response_rule(question: str, states: dict[Tuple[str], float]) -> float:
    """
    :param question: question the answer is given to
    :param states: dictionary mapping states (sets of problems/questions) to probabilities
    :return: probability of giving correct answer according to given states
    """
    ret_val = 0
    for state, probability in states.items():
        if question in state:
            ret_val += probability
    return ret_val

def updating_rule(question: str, answer_correct: bool, r: float, states: dict[Tuple[str], float]):
    """
    Updates probabilites on passed states.
    :param question: question the answer is given to
    :param answer_correct: whether answer is correct
    :param r: response rule output
    :param states: dictionary mapping states (sets of problems/questions) to probabilities
    """
    theta = 0.1 * r
    theta_compl = 1 - theta
    if not answer_correct:
        theta, theta_compl = theta_compl, theta

    for state in states:
        if question in state:
            states[state] *= theta_compl
        else:
            states[state] *= theta
    _scale_probabilites(states)

def is_final_state(states: dict[Tuple[str], float], threshold: float):
    state, probability = _likeliest_state(states)
    return probability >= threshold

def stochastic_markov_sotis(states, threshold = 0.75, question=None, is_answer_correct=None):
    _scale_probabilites(states)  # just in case
    if question is not None and is_answer_correct is not None: 
        r = response_rule(question, states)
        updating_rule(question, is_answer_correct, r, states)

    final_state_reached = is_final_state(states, threshold)
    new_question = None if final_state_reached else questioning_rule(states)
    print('Chosen question:', new_question)
    print('New states:', states)
    print('Final state reached:', final_state_reached)
    return states, new_question, final_state_reached


def demo():
    states = {('a'): 0.125, ('a', 'b'): 0.25, ('b'): 0.125, ('a', 'b', 'c'): 0.5}
    new_question = None
    n_iterations = 100
    for i in range(n_iterations):
        states, new_question, is_final = stochastic_markov_sotis(states, 0.8, new_question, is_answer_correct=True)
        if is_final:
            break
    print(f'finished after {i} iterations')

if __name__ == '__main__':
    demo()
