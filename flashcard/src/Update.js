import * as R from 'ramda';

export const actionType = {
  ADD_FLASHCARD: 'ADD_FLASHCARD'
};

export const action = (type, payload) => {
  return {
    type,
    payload
  };
};

function update(action, state) {
  const { type, payload } = action;
  const { nextId } = state;
  switch (type) {
    case 'ADD_FLASHCARD':
      const newCard = {
        id: nextId,
        question: 'Another one',
        answer: '',
        showAnswer: false,
        edit: true
      };
      const flashCards = [...state.flashCards, newCard];
      return { ...state, nextId: nextId + 1, flashCards };
  }
  return state;
}

export default update;
