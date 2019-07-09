import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

//Destruct all the needed functions from hyperscript
const { pre } = hh(h);

function view(dispatch, model) {
  //print app model as a json data with 2 space indentation.
  return pre(JSON.stringify(model, null, 2));
}

export default view;
