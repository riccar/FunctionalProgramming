import * as R from 'ramda';

export const actionType = {
  LEFT_INPUT: 'LEFT_INPUT',
  RIGHT_INPUT: 'RIGHT_INPUT'
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
    case actionType.LEFT_INPUT:
      const leftValue = toInt(payload);
      return { ...model, leftValue, inputLeft: true };
    case actionType.RIGHT_INPUT:
      const rightValue = toInt(payload);
      return { ...model, rightValue, inputLeft: false };
  }
  return model;
}

export default update;
