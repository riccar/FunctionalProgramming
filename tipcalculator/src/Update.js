import * as R from 'ramda';

export const actionType = {
  AMOUNT_INPUT: 'AMOUNT_INPUT',
  TIP_INPUT: 'TIP_INPUT'
};

export function action(type, payload) {
  return {
    type,
    payload
  };
}

function update(action, model) {
  const { type, payload } = action;
  switch (type) {
    case actionType.AMOUNT_INPUT:
      return { ...model, billAmount: payload };
    case actionType.TIP_INPUT:
      return { ...model, tipPercent: payload };
  }
  return model;
}

export default update;
