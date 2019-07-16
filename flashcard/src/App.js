import { diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';

function app(state, update, view, node) {
  let appState = state;
  let currentView = view(dispatch, appState);
  let rootNode = createElement(currentView);
  node.appendChild(rootNode);
  function dispatch(action) {
    appState = update(action, appState);
    const updatedView = view(dispatch, appState);
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);
    currentView = updatedView;
  }
}

export default app;
