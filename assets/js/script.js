import {
  calculateTDEE,
  calculateMacroNutrients,
  divideMeals,
  getFood,
} from "./calculateTdee.js";
import { createTDEEQuestionnaire } from "./tdeeQuestionnaire.js";
import { createMealPlan } from "./createMealPlan.js";
import { mainContainer } from "./constants.js";

const bodyContainer = document.querySelector(".body-container");
const mealPlanGenerator = document.getElementById("meal-plan-generator");
const workoutPlanGenerator = document.getElementById("workout-plan-generator");
const fetchExerciseObj = async (queryString) => {
  const apiKey = `KUNEX9M6Kwogj/J4y7Ru+A==FZ9J1FNl2AdRV6rw`;
  const url = `https://api.api-ninjas.com/v1/exercises?type=${queryString}`;

  try {
    const response = await fetch(`${url}`, {
      method: "GET",
      headers: {
        "X-Api-Key": `${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error: " + response.status);
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  }
};

const createWorkout = () => {
  const workoutPlan = document.createElement("form");
  workoutPlan.setAttribute("id", "workout-plan");
  workoutPlan.setAttribute("class", "workout-plan");
  workoutPlan.setAttribute(
    "style",
    "display: flex; flex-direction: column; align-items: center;"
  );
  mainContainer.appendChild(workoutPlan);

  const workoutPlanTitle = document.createElement("h2");
  workoutPlanTitle.setAttribute("id", "workout-plan-title");
  workoutPlanTitle.setAttribute("class", "workout-plan-title text-white");
  workoutPlanTitle.textContent = "Type of Workout";
  workoutPlan.appendChild(workoutPlanTitle);
};

workoutPlanGenerator.addEventListener("click", function (event) {
  event.preventDefault();
  clearMainContainer();
  createWorkout();
});

//================================================================================================

//TDEE Algorithm==================================================================================

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

function clearMainContainer() {

  var mainContainer = document.getElementById("main-container");

  while (mainContainer.firstChild) {
    mainContainer.removeChild(mainContainer.firstChild);
  }
}

const homeLink = document.getElementById("home-link");

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
//================================================================================================

const dropdownContainer = document.querySelector(".dropdown-container");
const dropdownTrigger = document.querySelector(".dropdown-trigger");

dropdownTrigger.addEventListener("click", function (event) {
  event.stopPropagation();
  dropdownContainer.classList.toggle("show");

  const dropdownOptions = document.querySelector(".dropdown-options");
  dropdownOptions.innerHTML = "";

  const localStorageKeys = Object.keys(localStorage);

  localStorageKeys.forEach((key) => {
    const option = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#" + key;
    link.textContent = key;
    option.appendChild(link);
    dropdownOptions.appendChild(option);


    link.addEventListener("click", function () {
      const selectedKey = this.textContent;
      const selectedValue = localStorage.getItem(selectedKey);

      if (selectedValue) {
        const dividedMeals = JSON.parse(selectedValue);
        loadMealPlan(dividedMeals);
        dropdownContainer.classList.toggle("show");
      }
    });
  });
});

document.getElementById('reload-page').addEventListener('click', function() {
  location.reload();
});

export { startFunction };
