import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

import { action, actionType } from './Update';

const { div, h1, pre, button, i, textarea } = hh(h);

const addFlashCardBtn = dispatch => {
  return div({}, [
    button(
      {
        className: 'pa2 br1 mv2 bg-green bn white',
        onclick: () => dispatch(action(actionType.ADD_FLASHCARD, ''))
      },
      i({ className: 'fa fa-plus ph1' }, 'Add Flashcard')
    )
  ]);
};

const listFlashCards = (dispatch, state) => {
  const cards = R.map(card(dispatch), state.flashCards);
  return div({ className: 'flex flex-wrap nl2 nr2' }, cards);
};

const card = R.curry((dispatch, card) => {
  const editMode = card.edit;
  return div({ className: 'w-third pa2' }, [
    div({ className: 'w-100 pa2 bg-light-yellow shadow-1 mv2 relative pb5' }, [
      editMode ? editCard(dispatch, card) : viewCard(dispatch, card),
      i({
        className: 'absolute top-0 right-0 fa fa-remove fa-fw black-50 pointer'
      })
    ])
  ]);
});

const viewCard = (dispatch, card) => {
  const { question, answer, ranking } = card;
  return div({}, [
    showContent(dispatch, card.id, question, 'Question'),
    showContent(dispatch, card.id, answer, 'Answer'),
    rankingButtons(dispatch, ranking)
  ]);
};

const showContent = (dispatch, id, content, label) => {
  return div({}, [
    div({ className: 'b f6 mv1 underline' }, label),
    div(
      {
        className: 'pointer',
        onclick: () =>
          dispatch(action(actionType.EDIT_FLASHCARD, { id, edit: true }))
      },
      content
    )
  ]);
};

const rankingButtons = (dispatch, ranking) => {
  return div({}, [
    div({ className: 'absolute bottom-0 left-0 w-100 ph2' }, [
      div({ className: 'mv2 flex justify-between' }, [
        button({ className: 'f4 ph3 pv2 bg-red bn white br1' }, 'Bad'),
        button({ className: 'f4 ph3 pv2 bg-blue bn white br1' }, 'Good'),
        button({ className: 'f4 ph3 pv2 bg-green bn white br1' }, 'Great')
      ])
    ])
  ]);
};

const editCard = (dispatch, card) => {
  const { id } = card;
  return div({}, [
    editContent(dispatch, actionType.INPUT_QUESTION, card),
    editContent(dispatch, actionType.INPUT_ANSWER, card),
    button(
      {
        className: 'f4 ph3 pv2 br1 bg-gray bn white mv2',
        onclick: () =>
          dispatch(action(actionType.SAVE_FLASHCARD, { id, edit: false }))
      },
      'Save'
    )
  ]);
};

const editContent = (dispatch, actionType, card) => {
  const [content, label, attribute] =
    actionType === 'INPUT_QUESTION'
      ? [card.question, 'Question', 'question']
      : [card.answer, 'Answer', 'answer'];
  return div({}, [
    div({ className: 'b f6 mv1 underline' }, label),
    textarea(
      {
        className: 'w-100 bg-washed-yellow outline-0',
        oninput: e =>
          dispatch(
            action(actionType, { id: card.id, [attribute]: e.target.value })
          )
      },
      content
    )
  ]);
};

const view = (dispatch, state) => {
  return div({ className: 'mw8 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Flashcard Study'),
    addFlashCardBtn(dispatch),
    listFlashCards(dispatch, state),
    pre(JSON.stringify(state, null, 2))
  ]);
};

export default view;
