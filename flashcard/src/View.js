import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

import { action, actionType } from './Update';

const { div, h1, pre, button, i } = hh(h);

const addFlashCardBtn = dispatch => {
  return div('', [
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
  return div({ className: 'w-third pa2' }, [
    div({ className: 'w-100 pa2 bg-light-yellow shadow-1 mv2 relative pb5' }, [
      'question'
    ])
  ]);
});

const view = (dispatch, state) => {
  return div({ className: 'mw8 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Flashcard Study'),
    addFlashCardBtn(dispatch),
    listFlashCards(dispatch, state),
    pre(JSON.stringify(state, null, 2))
  ]);
};

export default view;
