# Calorie Counting App Plan / Notes

## Data Model or App State

Example Model/Shape:

```javascript
meal = {
  id: 1,
  description: 'Breakfast',
  calories: 460
};
model = {
  meals: [], //list of meals
  showForm: false, //Dictate whether to show the add meal form or the button to add meal
  description: 'Dinner', //temporary description while meal is created
  calories: 600, //temporary calories while meal is created
  editId: 3, //id of the meal being edited. If empty and show form is true, then it's on add mode instead of edit mode
  nextId: 1 //Id of the next meal to be added, to simulate db incremental id.
};
```

## View Functions - Used to render various app components

- view - App view as a whole
  - formView - Form to add and edit meal
    - fieldSet - Form's fields
    - buttonSet - Form's save and cancel buttons
  - tableView - The whole table view
    - tableHeader - Table header with meals and calories header labels
    - mealsBody - To render the whole table body
      - mealRow - To render a whole row
        - cell - Renders particular cells
          \*totalRow - To calculate the total calories and render it as last row.

## Update Functions - Get called through users interaction with the app or automatic events

- click add meal
- meal input model update
- calories input model update
- save button function to add or update meal
- click edit icon to set the id of the meal being edited
- click delete icon to delete meal
