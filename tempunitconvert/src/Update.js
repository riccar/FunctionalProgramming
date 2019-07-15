import * as R from 'ramda';

import convert from './TempConversion';

export const actionType = {
  LEFT_VALUE_INPUT: 'LEFT_VALUE_INPUT',
  RIGHT_VALUE_INPUT: 'RIGHT_VALUE_INPUT',
  LEFT_UNIT_CHANGE: 'LEFT_UNIT_CHANGE',
  RIGHT_UNIT_CHANGE: 'RIGHT_UNIT_CHANGE'
};

/**
 * Creates an action object with a type and a payload
 * @param string type
 * @param object payload
 */
export function action(type, payload) {
  return {
    type,
    payload
  };
}

const toInt = R.pipe(
  parseInt,
  R.defaultTo(0)
);

function update(action, model) {
  const { type, payload } = action;
  switch (type) {
    case actionType.LEFT_VALUE_INPUT:
      const leftValue = toInt(payload);
      return convert({ ...model, leftValue, inputLeft: true });
    case actionType.RIGHT_VALUE_INPUT:
      const rightValue = toInt(payload);
      return convert({ ...model, rightValue, inputLeft: false });
    case actionType.LEFT_UNIT_CHANGE:
      return convert({ ...model, leftUnit: payload });
    case actionType.RIGHT_UNIT_CHANGE:
      return convert({ ...model, rightUnit: payload });
  }
  return model;
}

export default update;
