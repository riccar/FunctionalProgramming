import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

import formView from './Form';
import mealTable from './Table';

//Destruct all the needed functions from hyperscript
const { pre, div, h1 } = hh(h);

/**
 * Returns the application view
 * @param function dispatch
 * @param object model
 */
function view(dispatch, model) {
  return div({ className: 'mw6 center' }, [
    //font size 2 padding vertical 2 and bottom border
    h1({ className: 'f2 pv2 bb' }, 'Calories Counter'),
    //print app model as a json data with 2 space indentation.
    formView(dispatch, model),
    mealTable(dispatch, model.meals),
    pre(JSON.stringify(model, null, 2))
  ]);
}

export default view;
