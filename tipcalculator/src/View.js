import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

import { action, actionType } from './Update';

const { div, h1, p, pre, input, label } = hh(h);

function inputField(fieldLabel, value, dispatch, actionType) {
  return div({ className: 'w-40' }, [
    label({ className: 'db fw6 lh-copy f5' }, fieldLabel),
    input({
      className: 'border-box pa2 ba mb2 tr w-100',
      type: 'text',
      value,
      oninput: e => dispatch(action(actionType, e.target.value))
    })
  ]);
}

/**
 * Note how below two functions are separated. One prints a styled div and calls
 * another function that prints a nested div rendering calculated totals
 * This is to create more specialized functions easier to maintain and reuse
 *
 * Returns and div that holds calculated tip and total
 * @param string tip
 * @param string total
 */
function totalAmounts(tip, total) {
  return div({ className: 'w-40 b bt mt2 pt2' }, [
    calculatedResult('tip:', tip),
    calculatedResult('Total:', total)
  ]);
}

/**
 * Returns a div with a nested div for the label and the calculated amount
 * @param string label
 * @param string amount
 */
function calculatedResult(label, amount) {
  return div({ className: 'flex w-100' }, [
    div({ className: 'w-50 pv1 pr2' }, label),
    div({ className: 'w-50 tr pv1 pr2' }, amount)
  ]);
}

function tipCalculator(billAmount, tipPercent) {
  const bill = parseFloat(billAmount);
  const tip = (bill * parseFloat(tipPercent)) / 100 || 0;
  return [tip, bill + tip];
  //return div([p(`Tip: \$${tip}`), p(`Total: \$${total}`)]);
}

function view(dispatch, model) {
  const { billAmount, tipPercent } = model;
  const [tip, total] = tipCalculator(billAmount, tipPercent);
  //Partial application for formatMoney
  const toMoney = formatMoney('$', 2);

  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Tip Calculator'),
    inputField('Bill Amount', billAmount, dispatch, actionType.AMOUNT_INPUT),
    inputField('Tip %', tipPercent, dispatch, actionType.TIP_INPUT),
    totalAmounts(toMoney(tip), toMoney(total)),
    pre(JSON.stringify(model, null, 2))
  ]);
}

const round = places => {
  return R.pipe(
    num => num * Math.pow(10, places),
    Math.round,
    num => num * Math.pow(10, -1 * places)
  );
};

/**
 * Curring the following anonymous function as follow
 * It takes symbol, places and numbers and returns a composition of
 * the following functions
 *
 */
const formatMoney = R.curry((symbol, places, number) => {
  return R.pipe(
    R.defaultTo(0), //Default non number values to 0
    round(places), //Round input number to input decimal places
    num => num.toFixed(places), //Returns a string with the number of decimal places specified in places input param
    R.concat(symbol) //Concatenate the symbol in front of the value
  )(number); //The parameter Pipe is acting one.
});

export default view;
