import * as R from 'ramda';

export const actionType = {
  SHOW_FORM: 'SHOW_FORM',
  MEAL_INPUT: 'MEAL_INPUT',
  CALORIES_INPUT: 'CALORIES_INPUT'
};

// export function showFormAction(showForm) {
//   return {
//     type: actionType.SHOW_FORM,
//     showForm
//   };
// }

// export function mealInputAction(description) {
//   return {
//     type: actionType.MEAL_INPUT,
//     description
//   };
// }

// export function caloriesInputAction(calories) {
//   return {
//     type: actionType.CALORIES_INPUT,
//     calories
//   };
// }

export function action(type, payload) {
  return {
    type,
    payload
  };
}

function update(action, model) {
  const { type, payload } = action;
  switch (type) {
    case actionType.SHOW_FORM:
      return { ...model, showForm: payload, description: '', calories: 0 };
    case actionType.MEAL_INPUT:
      return { ...model, description: payload };
    case actionType.CALORIES_INPUT:
      const calories = R.pipe(
        parseInt,
        R.defaultTo(0) //If parseInt returns NaN, then default it to 0
      )(payload);
      return { ...model, calories };
  }
  return model;
}

export default update;
