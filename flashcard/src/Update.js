import * as R from 'ramda';

export const actionType = {
  ADD_FLASHCARD: 'ADD_FLASHCARD',
  SAVE_FLASHCARD: 'SAVE_FLASHCARD',
  INPUT_QUESTION: 'INPUT_QUESTION',
  INPUT_ANSWER: 'INPUT_ANSWER',
  EDIT_FLASHCARD: 'EDIT_FLASHCARD'
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
    case 'ADD_FLASHCARD': {
      const newCard = {
        id: nextId,
        question: '',
        answer: '',
        ranking: 0,
        showAnswer: false,
        edit: true
      };
      const flashCards = [...state.flashCards, newCard];
      return { ...state, nextId: nextId + 1, flashCards };
    }
    case 'INPUT_QUESTION': {
      const flashCards = R.map(updateCard(payload), state.flashCards);
      return { ...state, flashCards };
    }
    case 'INPUT_ANSWER': {
      const flashCards = R.map(updateCard(payload), state.flashCards);
      return { ...state, flashCards };
    }
    case 'SAVE_FLASHCARD': {
      const flashCards = R.map(updateCard(payload), state.flashCards);
      return { ...state, flashCards };
    }
    case 'EDIT_FLASHCARD': {
      const flashCards = R.map(updateCard(payload), state.flashCards);
      return { ...state, flashCards };
    }
  }
  return state;
}

const updateCard = R.curry((updatedCard, card) => {
  /**
   * Return an object spreading all the attributes from card and updatedCard.
   * Any attribute in common will be overridden with updatedCard ones.
   * */
  return updatedCard.id === card.id ? { ...card, ...updatedCard } : card;
});

export default update;
