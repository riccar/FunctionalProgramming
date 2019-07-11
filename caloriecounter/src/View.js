import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import * as R from 'ramda';

import { action, actionType } from './Update';

//Destruct all the needed functions from hyperscript
const {
  pre,
  div,
  h1,
  button,
  form,
  input,
  label,
  td,
  th,
  tr,
  tbody,
  thead,
  table,
  i
} = hh(h);

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
        onclick: () => dispatch(action(actionType.SHOW_FORM))
      },
      'Cancel'
    )
  ]);
}

function mealButtonSet(dispatch, mealId) {
  return div([
    i({
      className: 'ph1 fa fa-pencil-square-o pointer',
      onclick: () => dispatch(action(actionType.EDIT_MEAL, mealId))
    }),
    i({
      className: 'ph1 fa fa-trash-o pointer',
      onclick: () => dispatch(action(actionType.DELETE_MEAL, mealId))
    })
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
        className: 'w-100 mv2',
        onsubmit: e => {
          e.preventDefault();
          if (description && calories) dispatch(action(actionType.SAVE_MEAL));
        }
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
 * Returns HTML cel <tr> or <th> based on the given tag
 * @param string tag: HTML cell tag
 * @param string className: CSS classes
 * @param string value: Cell containing value
 */

function cell(tag, className, value) {
  return tag({ className }, value);
}

/**
 * Returns HTML row based on calls to the cell value
 * @param string className: CSS classes
 * @param object meal: Meal object to be display per row
 */

function mealRow(dispatch, className, meal) {
  return tr({ className }, [
    cell(td, 'pa2', meal.description),
    cell(td, 'pa2 tr', meal.calories),
    cell(td, 'pa2 tr', mealButtonSet(dispatch, meal.id))
  ]);
}

/**
 * Returns table body, produced by mapping through the meals and
 * calling a mealRow per meal and finally appending the last row with meal total
 * @param string className
 * @param array meals
 */
function mealsBody(dispatch, className, meals) {
  const rows = R.map(R.partial(mealRow, [dispatch, 'stripe-dark']), meals);

  const rowsWithTotal = [...rows, totalRow(meals)];

  return tbody({ className }, rowsWithTotal);
}

/**
 * Const headerRow consist on calling 3 cells with header labels
 */
const headerRow = tr([
  cell(th, 'pa2 tl', 'Meal'),
  cell(th, 'pa2 tr', 'Calories'),
  cell(th, '', '')
]);

/**
 * Const mealsHeader contains the headerRows within HTML <thead> tag
 */
const mealsHeader = thead(headerRow);

/**
 * returns the last row with the sum of all the meal calories
 * @param object meals: Object with meals
 */

function totalRow(meals) {
  const total = R.pipe(
    //Partially applying map that returns an array of calories
    R.map(meal => meal.calories),
    //pipe sends the array of calories to the reduce funtion that takes two params
    //the first is the transformation function that add the calories
    //the second is the acc initial value of 0
    R.reduce((acc, calories) => acc + calories, 0)
  )(meals); //meals is the last parameter pipe receives which is
  //the data it will act upon.
  return tr({ className: 'bt b' }, [
    cell(td, 'pa2 tr', 'Total:'),
    cell(td, 'pa2 tr', total),
    cell(td, '', '')
  ]);
}

/**
 * Returns the HTML table produced by calling the mealsHeader and mealsBody passing
 * the list of meals
 * @param string className: CSS classes
 * @param array meals: list of meals
 */

function mealTable(dispatch, meals) {
  if (meals.length === 0) {
    return div({ className: 'mv2 i black-50' }, 'No meals to display...');
  }
  return table({ className: 'mv2 center w-100 collapse' }, [
    mealsHeader,
    mealsBody(dispatch, '', meals)
  ]);
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
    mealTable(dispatch, model.meals),
    pre(JSON.stringify(model, null, 2))
  ]);
}

export default view;
