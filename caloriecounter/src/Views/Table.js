import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import * as R from 'ramda';

import { action, actionType } from '../Update';

//Destruct all the needed functions from hyperscript
const { div, td, th, tr, tbody, thead, table, i } = hh(h);

/**
 * TODO: convert this view as a generic table where
 * number of columns, header labels are parameterized and
 * last rows with total is optional.
 */

/**
 * Returns HTML cel <tr> or <th> based on the given tag
 * @param string tag: HTML cell tag
 * @param string className: CSS classes
 * @param string value: Cell containing value
 */

function cell(tag, className, value) {
  return tag({ className }, value);
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
  //Partially call mealRow with dispatch and the CSS class so it can be called by map with every meal
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
    //pipe sends the array of calories to the reduce function that takes two params
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

export default mealTable;
