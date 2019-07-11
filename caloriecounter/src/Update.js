import * as R from 'ramda';

export const actionType = {
  SHOW_FORM: 'SHOW_FORM',
  MEAL_INPUT: 'MEAL_INPUT',
  CALORIES_INPUT: 'CALORIES_INPUT',
  SAVE_MEAL: 'SAVE_MEAL',
  EDIT_MEAL: 'EDIT_MEAL',
  DELETE_MEAL: 'DELETE_MEAL'
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

/**
 * Add a meal to the meals array
 * @param object model
 */

function add(model) {
  const { nextId, description, calories } = model;
  const meal = { id: nextId, description, calories };
  const meals = [...model.meals, meal];
  return {
    ...model,
    meals,
    nextId: nextId + 1,
    description: '',
    calories: 0,
    showForm: false
  };
}

/**
 * Updates meal within meals list matching updateId
 * @param object model
 */
function edit(model) {
  const { editId, description, calories } = model;
  const meals = R.map(meal => {
    if (meal.id === editId) {
      return { ...meal, description, calories };
    }
    return meal;
  }, model.meals);

  return {
    ...model,
    meals,
    description: '',
    calories: 0,
    showForm: false,
    editId: null
  };
}

/**
 * Update model for selected meal to be edited
 * @param object model
 * @param number editId
 */

function setForEdit(model, editId) {
  const meal = R.find(meal => meal.id === editId, model.meals);
  const { description, calories } = meal;

  return { ...model, description, calories, showForm: true, editId };
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

    case actionType.SAVE_MEAL:
      const { editId } = model;
      const updatedModel = editId !== null ? edit(model) : add(model);
      return updatedModel;

    case actionType.EDIT_MEAL:
      return setForEdit(model, payload);

    case actionType.DELETE_MEAL:
      const meals = R.filter(meal => meal.id !== payload, model.meals);
      return { ...model, meals };
  }
  return model;
}

export default update;
