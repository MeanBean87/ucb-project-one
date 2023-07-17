import { mainContainer } from "./constants.js";

const createMealPlan = (dividedMeals, mealObj) => {
  const canvasCheck = document.getElementById("meal-plan-chart");
  
  if (canvasCheck) {
    canvasCheck.remove();
  }
  
  const canvas = document.createElement("canvas");
  canvas.setAttribute("id", "meal-plan-chart");
  canvas.setAttribute("class", "meal-plan-chart");
  mainContainer.appendChild(canvas);
  
  const labels = [];
  const calories = [];
  const carbohydrates = [];
  const protein = [];
  const fat = [];
  
  // Extract data from dividedMeals object
  Object.entries(dividedMeals).forEach(([key, value]) => {
    labels.push(key.charAt(0).toUpperCase() + key.slice(1));
    calories.push(value.calories);
    carbohydrates.push(value.carbohydrates);
    protein.push(value.protein);
    fat.push(value.fat);
  });
  
  new Chart(canvas, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Calories",
          data: calories,
          backgroundColor: "rgba(75, 192, 192, 0.6)"
        },
        {
          label: "Carbohydrates",
          data: carbohydrates,
          backgroundColor: "rgba(255, 99, 132, 0.6)"
        },
        {
          label: "Protein",
          data: protein,
          backgroundColor: "rgba(54, 162, 235, 0.6)"
        },
        {
          label: "Fat",
          data: fat,
          backgroundColor: "rgba(255, 206, 86, 0.6)"
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true
        },
        y: {
          beginAtZero: true,
          stacked: true
        }
      }
    }
  });
  
  const mealOptions = ["Breakfast", "Lunch", "Dinner", "Snacks"];
  let selectedMealObj;
  
  const mealPlanContainer = document.createElement("div");
  mealPlanContainer.setAttribute("class", "dropdown-container");
  mainContainer.appendChild(mealPlanContainer);
  
  const selectMealPlan = document.createElement("select");
  selectMealPlan.setAttribute("class", "select-meal-items");
  selectMealPlan.setAttribute("id", "select-meal-items");
  mealPlanContainer.appendChild(selectMealPlan);

  mealOptions.forEach((meal) => {
    const option = document.createElement("option");
    option.setAttribute("value", mealOptions[meal]);
    option.textContent = mealOptions[meal];
    selectMealPlan.appendChild(option);
  });
  
  selectMealPlan.addEventListener("change", handleSelection);
  
  function handleSelection(event) {
    const selectedMeal = event.target.value;
    const selectedMealObj = mealObj[selectedMeal];
  };
  
  const mealPlanList = document.createElement("ul");
  mealPlanList.setAttribute("class", "meal-plan-list");
  mealPlanContainer.appendChild(mealPlanList);

  const mealPlanItems = Object.entries(selectedMealObj).forEach(([key, value]) => {
    const mealPlanItem = document.createElement("li");
    mealPlanItem.setAttribute("class", "meal-plan-item");
    mealPlanItem.textContent = `${key}: ${value}`;
    mealPlanList.appendChild(mealPlanItem);
  });

};
export { createMealPlan };