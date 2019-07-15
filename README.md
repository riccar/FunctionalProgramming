# Functional Programming with JavaScript

Based on the course "Functional Programming for Beginners with JavaScript by James Moore" https://github.com/knowthen/fpjs

##A number of small apps developed entirely with pure JS and a few libraries

- Counter: Simple counter app
- Caloriecounter. Allows to add edit and delete meals and their calories. It shows meals in a table where the last row is the total number of calories for all the meals.
- tempunitconvert. Converts temperature units between Fahrenheit, Celsius and Kelvin.

##Libraries used

- Ramda: Facilitate Functional Programming in JS by offering heaps of useful already-curred functions. It also allows function composition easily with the pipe function. https://ramdajs.com/
- HyperScript & HyperScript-Helper: To return HTML from pure functions in order to build UI. https://github.com/hyperhype/hyperscript
- VirtualDom: To help rendering only the difference between the old view and the current view, rather than refreshing the whole page with every change of the app state. https://github.com/Matt-Esch/virtual-dom

##Architecture

The architecture followed is very similar to Elm-lang architecture with the following components

- App function that host and tightly controls all the application side-effects. This function also contains the dispatch function that triggers actions or messages to update the app state.
- Model or application state. A JS object literal representing the whole app state.
- View: A number of pure functions that receive the dispatch function and the model and returns some amount of HTML to be rendered on the page. The dispatch function is execute through event listeners to various HTML elements.
- Update. A pure function that returns a new state for every app action received via dispatch.
