import * as R from 'ramda';

export const actionType = {
  ADD_FLASHCARD: 'ADD_FLASHCARD',
  SAVE_FLASHCARD: 'SAVE_FLASHCARD',
  INPUT_QUESTION: 'INPUT_QUESTION',
  INPUT_ANSWER: 'INPUT_ANSWER',
  EDIT_FLASHCARD: 'EDIT_FLASHCARD',
  DELETE_FLASHCARD: 'DELETE_FLASHCARD',
  SHOW_ANSWER: 'SHOW_ANSWER',
  RANK_ANSWER: 'RANK_ANSWER'
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
    case 'DELETE_FLASHCARD': {
      const flashCards = R.filter(
        card => card.id !== payload.id,
        state.flashCards
      );
      return { ...state, flashCards };
    }
    case 'SHOW_ANSWER': {
      const flashCards = R.map(updateCard(payload), state.flashCards);
      return { ...state, flashCards };
    }
    case 'RANK_ANSWER': {
      const flashCards = R.map(updateCardPlusRank(payload), state.flashCards);
      return { ...state, flashCards };
    }
  }
  return state;
}

/**
 * updateCard is a curried function (so it can be passed to map) that takes two cards and return a new card
 * with all their fields merged. Since updatedCard is spread secondly, their
 * field values will take precedence. updatedCard may not have all the card attributes
 */
const updateCard = R.curry((updatedCard, card) => {
  /**
   * Return an object spreading all the attributes from card and updatedCard.
   * Any attribute in common will be overridden with updatedCard ones.
   * */
  return updatedCard.id === card.id ? { ...card, ...updatedCard } : card;
});

const updateCardPlusRank = R.curry((updatedCard, card) => {
  return updatedCard.id === card.id
    ? { ...card, ...updatedCard, ranking: card.ranking + updatedCard.ranking }
    : card;
});

export default update;
