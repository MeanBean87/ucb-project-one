import { mainContainer } from "./constants.js";

const chartContainerCheck = document.querySelector(".chart-container");
// initializing createMealPlan function, taking dividedMeals and mealObj as parameters
const createMealPlan = (dividedMeals, mealObj) => {
  // if statement to check if chartContainerCheck exists to remove it and create a new one
  if (chartContainerCheck) {
    chartContainerCheck.remove();
  }
  // creating chartContainer div and appending it to mainContainer
  const chartContainer = document.createElement("div");
  chartContainer.setAttribute("class", "chart-container");
  mainContainer.appendChild(chartContainer);
  chartContainer.setAttribute(
    "style",
    "display: flex; flex-direction: column; align-items: center;"
  );

  console.log(mealObj);
  // creating canvas element and appending it to chartContainer
  const canvas = document.createElement("canvas");
  canvas.setAttribute("id", "meal-plan-chart");
  canvas.setAttribute("class", "meal-plan-chart");

  chartContainer.appendChild(canvas);
  // creating labels, calories, carbohydrates, protein, fat arrays to later be used in Chart.js to create a bar chart
  const labels = [];
  const calories = [];
  const carbohydrates = [];
  const protein = [];
  const fat = [];

  // Extract data from dividedMeals object and push to arrays to be used in Chart.js
  Object.entries(dividedMeals).forEach(([key, value]) => {
    labels.push(key.charAt(0).toUpperCase() + key.slice(1));
    calories.push(value.calories);
    carbohydrates.push(value.carbohydrates);
    protein.push(value.protein);
    fat.push(value.fat);
  });
  // creating chart to display data from arrays which is our nutrition facts for each meal
  new Chart(canvas, {
    // type of chart is bar
    type: "bar",
    data: {
      //labels refer to the type of macronutrient
      labels: labels,
      datasets: [
        {
          // label is Calories
          label: "Calories",
          data: calories,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
        {
          // label is Carbohydrates
          label: "Carbohydrates",
          data: carbohydrates,
          backgroundColor: "rgba(255, 99, 132, 0.6)",
        },
        {
          label: "Protein",
          data: protein,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
        },
        {
          label: "Fat",
          data: fat,
          backgroundColor: "rgba(255, 206, 86, 0.6)",
        },
      ],
    },
    // options for chart to be responsive and stacked
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          // beginAtZero is set to true so that the y axis starts at 0
          beginAtZero: true,
          stacked: true,
        },
      },
    },
  });
  // creating mealPlanContainer div and appending it to mainContainer
  const mealPlanContainer = document.createElement("div");
  mealPlanContainer.setAttribute("class", "dropdown-container");
  mainContainer.appendChild(mealPlanContainer);
  // creating selectMealPlan select element and appending it to mealPlanContainer
  const selectMealPlan = document.createElement("select");
  selectMealPlan.setAttribute("class", "select-meal-items");
  selectMealPlan.setAttribute("id", "select-meal-items");
  mealPlanContainer.appendChild(selectMealPlan);
  // options for selectMealPlan, which is the meal options of Breakfast, Lunch, Dinner, Snacks
  const mealOptions = ["Select Meal", "Breakfast", "Lunch", "Dinner", "Snacks"];
  // forEach loop to create option element for each meal option and append it to selectMealPlan once the user selects a meal option
  mealOptions.forEach((meal) => {
    const option = document.createElement("option");
    option.setAttribute("value", meal);
    option.textContent = meal;
    selectMealPlan.appendChild(option);
  });
  // event listener for selectMealPlan to create a list of recipes for the meal option the user selects
  selectMealPlan.addEventListener("change", function () {
    // we are setting selectedMeal to the value of the meal option the user selects
    const selectedMeal = this.value;
    const oldList = document.querySelector(".meal-plan-list");
    // if statement to check if oldList exists to remove it and create a new one
    if (oldList) {
      mealPlanContainer.removeChild(oldList);
    }
    //defining selection variable
    let selection;
    // switch statement to set selection to the mealObj of the meal option the user selects
    switch (selectedMeal) {
      case "Breakfast":
        selection = mealObj.breakfastObj;
        break;
      case "Lunch":
        selection = mealObj.lunchObj;
        break;
      case "Dinner":
        selection = mealObj.dinnerObj;
        break;
      case "Snacks":
        selection = mealObj.snacksObj;
        break;
      default:
        console.log("Invalid selection.");
        return;
    }
    // creating unorderedList element
    const unorderedList = document.createElement("ul");
    unorderedList.setAttribute("class", "meal-plan-list");
    // forEach loop to create a list item for each recipe in the meal option the user selects
    if (selection) {
      Object.values(selection.hits).forEach((item) => {
        // creating recipeContainer div to hold each recipe
        const recipeContainer = document.createElement("div");
        recipeContainer.setAttribute("class", "recipe-container");
        // creating listItem img element to hold the image of each recipe
        const listItem = document.createElement("img");
        listItem.setAttribute("class", "meal-plan-image");
        listItem.setAttribute("alt", item.recipe.label);
        listItem.setAttribute("title", item.recipe.label);
        listItem.setAttribute("width", "200");
        listItem.setAttribute("height", "200");
        listItem.setAttribute("src", item.recipe.image);
        // event listener for listItem to set the image to a placeholder image if the image does not load
        listItem.addEventListener("error", function (event) {
          event.preventDefault();
          this.src = "http://via.placeholder.com/200x200";
        });
        // appending listItem to recipeContainer
        recipeContainer.appendChild(listItem);
        // creating link element to hold the link to each recipe
        const link = document.createElement("a");
        link.href = item.recipe.url;
        link.target = "_blank";
        link.textContent = item.recipe.label;
        // appending link to recipeContainer
        recipeContainer.appendChild(link);
        // creating nutritionFacts div to hold the nutrition facts of each recipe
        const nutritionFacts = document.createElement("div");
        nutritionFacts.setAttribute("class", "nutrition-facts");

        const nutritionFactsText = document.createElement("p");
        // setting the text content of nutritionFactsText to the nutrition facts of each recipe
        nutritionFactsText.textContent = `Calories: ${Math.round(
          item.recipe.calories / item.recipe.yield
        )} | Carbohydrates: ${Math.round(
          item.recipe.totalNutrients.CHOCDF.quantity / item.recipe.yield
        )} | Protein: ${Math.round(
          item.recipe.totalNutrients.PROCNT.quantity / item.recipe.yield
        )} | Fat: ${Math.round(
          item.recipe.totalNutrients.FAT.quantity / item.recipe.yield
        )}`;
        nutritionFactsText.setAttribute("class", "nutrition-facts-text");
        nutritionFactsText.setAttribute("style", "color: white;");
        recipeContainer.appendChild(nutritionFactsText);

        unorderedList.appendChild(recipeContainer);
      });
    }
    mealPlanContainer.appendChild(unorderedList);
  });
};

export { createMealPlan };
