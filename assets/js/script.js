import {
  calculateTDEE,
  calculateMacroNutrients,
  divideMeals,
  getFood,
} from "./calculateTdee.js";
import { createTDEEQuestionnaire } from "./tdeeQuestionnaire.js";
import { createMealPlan } from "./createMealPlan.js";
import { createExercisePlan } from "./workoutPlan.js";

const homeLink = document.getElementById("home-link");
const mealOptions = document.getElementById("meal-options");
const mealContainer = document.getElementById("meal-container");
const mealTrigger = document.getElementById("meal-trigger");
const workOutContainer = document.getElementById("workout-container");
const workOutTrigger = document.getElementById("workout-trigger");
const workOutOptions = document.getElementById("workout-options");

const bodyContainer = document.querySelector(".body-container");
const mealPlanGenerator = document.getElementById("meal-plan-generator");

const startFunction = async (
  weight,
  feet,
  inches,
  age,
  gender,
  activityLevel,
  goal,
  name
) => {
  try {
    let tdee = calculateTDEE(weight, feet, inches, age, gender, activityLevel);
    let macroNutrients = calculateMacroNutrients(tdee, goal);
    let dividedMeals = divideMeals(tdee, macroNutrients);
    let mealObj = await getFood(dividedMeals);
    localStorage.setItem(name, JSON.stringify(dividedMeals));
    clearMainContainer();
    createMealPlan(dividedMeals, mealObj);
  } catch (error) {
    console.error("An error occurred during startFunction:", error);
  }
};

const loadMealPlan = async (dividedMeals) => {
  try {
    let mealObj = await getFood(dividedMeals);
    clearMainContainer();
    createMealPlan(dividedMeals, mealObj);
  } catch (error) {
    console.error("An error occurred during loadMealPlan:", error);
  }
};

const clearMainContainer = () => {
  var mainContainer = document.getElementById("main-container");

  while (mainContainer.firstChild) {
    mainContainer.removeChild(mainContainer.firstChild);
  }
};

homeLink.addEventListener("click", function (event) {
  event.preventDefault();
  setTimeout(() => {
    clearMainContainer();
    createTDEEQuestionnaire();
  }, 2000);
});

mealPlanGenerator.addEventListener("click", function (event) {
  event.preventDefault();
  bodyContainer.i;
  clearMainContainer();
  createTDEEQuestionnaire();
});

mealTrigger.addEventListener("click", function (event) {
  event.stopPropagation();
  mealContainer.classList.toggle("show");

  mealOptions.innerHTML = "";

  const localStorageKeys = Object.keys(localStorage);

  localStorageKeys.forEach((key) => {
    const option = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#" + key;
    link.textContent = key;
    option.appendChild(link);
    mealOptions.appendChild(option);

    link.addEventListener("click", function () {
      const selectedKey = this.textContent;
      const selectedValue = localStorage.getItem(selectedKey);

      if (selectedValue) {
        const dividedMeals = JSON.parse(selectedValue);
        loadMealPlan(dividedMeals);
        mealContainer.classList.toggle("show");
      }
    });
  });
});

workOutTrigger.addEventListener("click", function (event) {
  event.stopPropagation();
  workOutContainer.classList.toggle("show");
});

workOutOptions.addEventListener("click", function (event) {
  event.preventDefault();
  clearMainContainer();
  createExercisePlan(event.target.getAttribute("value"));
  workOutContainer.classList.toggle("show");
});

document.getElementById("reload-page").addEventListener("click", function () {
  location.reload();
});

export { startFunction };
