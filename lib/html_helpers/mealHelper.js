const $ = require('jQuery')
const FoodHelper = require('./foodHelper')

class MealHelper {

  addTablesFromJSON(data) {
    data.forEach((table) => {
      this.addMealTable(table["id"], table["name"], $('#meals-tables'))
      this.addFoodsToMeals(table)
      this.addTotalCalories(table["id"], table["name"])
    })
  }

  addMealTable(id, name, parentNode) {
    let newTable = $(`<table class="meal" data-id=${id}><caption>${name}</caption></table>`)
    parentNode.append(newTable)
    newTable.append('<tr><th>Name</th><th>Calories</th></tr>')
  }

  addFoodsToMeals(table) {
    table["foods"].forEach((food) => {
      this.addFood(food["id"], food["name"], food["calories"], table["id"], table["name"].toLowerCase())
      })
  }
  
  addFood(id, name, calories, mealId, mealName, bottom=true) {
    let newRow = $(`<tr class="${mealName}-${id}"></tr>`)
    if (bottom) {
      $(`.meal[data-id=${mealId}]`).append(newRow);
    } else {
      $(newRow).insertAfter('#meal-table-headers');
    }
    FoodHelper.addFoodInfo(id, name, calories, newRow)
  }

  addTotalCalories(id, name) {
    let $table = $(`table.meal[data-id=${id}]`)
    let $calories = $table.find('td.food-calories')
    let subtotal = 0
    $calories.each((ind, calorie) => {
      subtotal += parseInt(calorie.textContent)
    })
    this.total += subtotal
    $table.append(`<tr class='darker'><td>Total Calories</td><td class="total">${subtotal}</td></td>`)
    let remaining = this.remainingCalories(name, subtotal)
    let color = this.colorOfRemaining(remaining)
    let remainingElement = $(`<tr class='darker'><td>Remaining Calories</td><td class=${color}>${remaining}</td></tr>`)
    $table.append(remainingElement)
  }

  remainingCalories(tableName, total) {
    if (tableName == "Snack") {
      return 200 - total
    } else if (tableName == "Breakfast") {
      return 400 - total
    } else if (tableName == "Lunch") {
      return 600 - total
    } else if (tableName == "Dinner") {
      return 800 - total
    } else {
      return "N/A"
    }
  }

  colorOfRemaining(remaining) {
    if (remaining > 0) {
      return "green"
    } else {
      return "red"
    }
  }
}

module.exports = new MealHelper