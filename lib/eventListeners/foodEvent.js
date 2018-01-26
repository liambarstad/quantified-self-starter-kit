const $ = require('jQuery')
const FoodService = require('../services/foodService')

$(document).ready(() => {
  FoodService.getAllFoods();

  $('form input[value="submit"]').on('click', (event) => {
    event.preventDefault();
    FoodService.postFood();
  });

  $('#foods-table').on('click', (event) => {
     event.stopPropagation();
    if (event.target.className == 'delete-food') {
      FoodService.deleteFood(event.target);
    } else if (event.target.className.length > 0){
      FoodService.editBox(event.target);
    }
  });

});