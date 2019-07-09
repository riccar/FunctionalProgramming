import hh from 'hyperscript-helpers'; //provides all the html functions like div, p, h1 etc.
import { h, diff, patch } from 'virtual-dom'; //allows to refresh only the portion of the html elements that changed
import createElement from 'virtual-dom/create-element';

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

export default app;
