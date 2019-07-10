import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { action, actionType } from './Update';

//Destruct all the needed functions from hyperscript
const { pre, div, h1, button, form, input, label } = hh(h);

/**
 * Return a HTML form field
 * @param string labelText
 * @param string inputValue
 */
function fieldSet(labelText, inputValue, oninput) {
  return div([
    //display block, margin bottom 1
    label({ className: 'db mb1' }, labelText),
    input({
      //padding all 2, input reset(appearance none) border all, width 100%, margin bottom 2
      className: 'pa2 input-reset ba w-100 mb2',
      type: 'text',
      value: inputValue,
      oninput
    })
  ]);
}

/**
 * Returns HTML save and cancel button set
 * @param function dispatch
 */
function buttonSet(dispatch) {
  return div([
    button(
      {
        //font size 3, padding vertical 2, pad. hor 3, bg color blue, color white, border none, margin 2, dim effect on mouse over
        className: 'f3 pv2 ph3 bg-blue white bn mr2 dim',
        type: 'submit'
      },
      'Save'
    ),
    button(
      {
        className: 'f3 pv2 ph3 bn bg-light-gray dim',
        type: 'button',
        onclick: () => dispatch(action(actionType.SHOW_FORM, false))
      },
      'Cancel'
    )
  ]);
}

/**
 * Returns the new or edit meal form
 * @param function dispatch
 * @param  object model
 */

function formView(dispatch, model) {
  const { description, calories, showForm } = model;

  if (showForm) {
    return form(
      {
        //width 100%, margin vertical 2
        className: 'w-100 mv2'
      },
      [
        fieldSet('Meal', description, e =>
          dispatch(action(actionType.MEAL_INPUT, e.target.value))
        ),
        fieldSet('Calories', calories || '', e =>
          dispatch(action(actionType.CALORIES_INPUT, e.target.value))
        ),
        buttonSet(dispatch)
      ]
    );
  }

  return button(
    //Font size 3, padding vertical 2, padding horizontal 3, background blue, font white, border none
    {
      className: 'f3 pv2 ph3 bg-blue white bn',
      onclick: () => dispatch(action(actionType.SHOW_FORM, true))
    },
    'Add Meal'
  );
}

/**
 * Returns the application view
 * @param function dispatch
 * @param object model
 */
function view(dispatch, model) {
  return div({ className: 'mw6 center' }, [
    //font size 2 padding vertical 2 and bottom border
    h1({ className: 'f2 pv2 bb' }, 'Calorie Counter'),
    //print app model as a json data with 2 space indentation.
    formView(dispatch, model),
    pre(JSON.stringify(model, null, 2))
  ]);
}

export default view;
