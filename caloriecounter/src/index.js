import initModel from './Model';
import update from './Update';
import view from './Views/CaloriesCounter';
import app from './App';

/**
 * Get a reference of the div with id=app in index.html
 */
const rootNode = document.getElementById('app');

/**
 * Run the application
 */
app(initModel, update, view, rootNode);
