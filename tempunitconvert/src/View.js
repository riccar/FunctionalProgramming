import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

import { action, actionType } from './Update';

const { div, h1, pre, input, select, option } = hh(h);

const units = ['Fahrenheit', 'Celsius', 'Kelvin'];

function unitOptions(selectedUnit) {
  return R.map(
    //selected: true when selectedUnit matches current unit
    unit => option({ value: unit, selected: selectedUnit === unit }, unit),
    units
  );
}

/**
 * Returns an html set of fields as <input> and <select>
 * @param {*} dispatch
 * @param {*} model
 */
function unitSelection(unit, value, oninput, onchange) {
  //width 50%
  return div({ className: 'w-50 ma1' }, [
    input({
      //padding all 2, input reset(appearance none) border all, width 100%, margin bottom 2
      className: 'db w-100 mv2 pa2 input-reset ba',
      type: 'text',
      value,
      oninput
    }),
    select(
      {
        className: 'db w-100 pa2 ba input-reset br1 bg-white ba b--black',
        onchange
      },
      unitOptions(unit)
    )
  ]);
}

function view(dispatch, model) {
  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Temperature Unit Converter'),
    div({ className: 'flex' }, [
      unitSelection(
        model.leftUnit,
        model.leftValue,
        e => dispatch(action(actionType.LEFT_VALUE_INPUT, e.target.value)),
        e => dispatch(action(actionType.LEFT_UNIT_CHANGE, e.target.value))
      ),
      div({ className: 'f2 mv3 mh4' }, '='),
      unitSelection(
        model.rightUnit,
        model.rightValue,
        e => dispatch(action(actionType.RIGHT_VALUE_INPUT, e.target.value)),
        e => dispatch(action(actionType.RIGHT_UNIT_CHANGE, e.target.value))
      )
    ]),
    pre(JSON.stringify(model, null, 2))
  ]);
}

export default view;
