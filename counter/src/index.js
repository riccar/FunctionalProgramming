//import h from 'hyperscript';
import hh from 'hyperscript-helpers'; //provides all the html functions like div, p, h1 etc.
import { h, diff, patch } from 'virtual-dom'; //allows to refresh only the portion of the html elements that changed
import createElement from 'virtual-dom/create-element';

//Destruct all the needed functions from hyperscript
const { div, button } = hh(h);

//Initialize app state
const initState = 0;

/**
 * Renders the counter in the screen
 * @param dispatch: function
 * @param {*} state: Application state, in this case is just the count number value
 */

function view(dispatch, state) {
  /**
   * Call hyperscript div function to render a div on the page that includes
   * another div for the count label, the count number and the plus and minus buttons
   * mv2: margin vertical second step
   * pv1: padding vertical second step
   * ph2: padding horizontal second step
   * mr2: margin right second step
   */
  return div({ className: 'mv2' }, [
    div(`Count: ${state}`),
    button(
      { className: 'pv1 ph2 mr2', onclick: () => dispatch(actionType.add) },
      '+'
    ),
    button(
      { className: 'pv1 ph2', onclick: () => dispatch(actionType.subtract) },
      '-'
    )
  ]);
}

const actionType = {
  add: 'add',
  subtract: 'subtract'
};

/**
 * Update app state according to the given action
 * @param action The action to be taken by the update function
 * @param state The app state
 */

function update(action, state) {
  switch (action) {
    //Even though actionType is not part of the input param, it's a constant we won't
    //change, hence the function remains pure.
    case actionType.add:
      return state + 1;
    case actionType.subtract:
      return state - 1;
    default:
      return state;
  }
}

/**
 * WARNING: impure code below
 */

/**
 * Function app() receives all the pure functions
 * and provides the app lifecycle to
 * to call them according to user's interaction.
 * @param number initState
 * @param function update
 * @param function view
 * @param object node
 */

//Tightly control the side effects within the app function
function app(initState, update, view, node) {
  //Initialize app state
  let state = initState;
  //Produce first app render
  let currentView = view(dispatch, state);
  //Create a virtual dom element using the current view
  let rootNode = createElement(currentView);
  //Show the first app render on the page using the virtual dom element
  node.appendChild(rootNode);

  //App lifecycle. Called when the user clicks on the plus or minus buttons
  function dispatch(action) {
    //update the state based on the given action
    state = update(action, state);
    //Update the view based on the new state
    const updatedView = view(dispatch, state);
    //calculate the difference (what changed) between the current view and de updated view
    const patches = diff(currentView, updatedView);
    //Patch rootNode with the minimum changes between current view and updated view
    //Only updated html element will be re-rendered instead of the whole view.
    rootNode = patch(rootNode, patches);
    //replace the current view with the updated view so current view can be compared
    //with the newly updated view during the next dispatch call
    currentView = updatedView;
  }
}

/**
 * Get a reference of the div with id=app in index.html
 */
const rootNode = document.getElementById('app');

/**
 * Run the application
 */
app(initState, update, view, rootNode);
