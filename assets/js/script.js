import {
  calculateTDEE,
  calculateMacroNutrients,
  divideMeals,
  getFood,
} from "./calculateTdee.js";
import {
  mainContainer,
  homeLink,
  mealOptions,
  mealContainer,
  mealTrigger,
  workOutContainer,
  workOutTrigger,
  workOutOptions,
  bodyContainer,
  mealPlanGenerator,
  localStorageKeys,
} from "./constants.js";
import { createTDEEQuestionnaire } from "./tdeeQuestionnaire.js";
import { createMealPlan } from "./createMealPlan.js";
import { createExercisePlan } from "./workoutPlan.js";

// this function is called when the user clicks the submit button on the TDEE questionnaire
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
  // this try block will run the functions to calculate the TDEE, macroNutrients, divideMeals, and getFood
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
// loadMealPlan function is called when the user clicks on a meal plan from the mealOptions list
const loadMealPlan = async (dividedMeals) => {
  try {
    let mealObj = await getFood(dividedMeals);
    clearMainContainer();
    createMealPlan(dividedMeals, mealObj);
  } catch (error) {
    console.error("An error occurred during loadMealPlan:", error);
  }
};
// clearMainContainer function is called when the user clicks on the homeLink or the mealPlanGenerator button
const clearMainContainer = () => {
  while (mainContainer.firstChild) {
    mainContainer.removeChild(mainContainer.firstChild);
  }
};
// when you click on the homeLink (the logo) it will clear the mainContainer and create the TDEE questionnaire
document.addEventListener("DOMContentLoaded", function () {
  homeLink.addEventListener("click", function (event) {
    event.preventDefault();
    setTimeout(() => {
      clearMainContainer();
      createTDEEQuestionnaire();
    }, 2000);
  });

  // when you click on the mealPlanGenerator button it will clear the mainContainer and create the TDEE questionnaire
  mealPlanGenerator.addEventListener("click", function (event) {
    event.preventDefault();
    bodyContainer.i;
    clearMainContainer();
    createTDEEQuestionnaire();
  });

  // when you click on the mealTrigger button it will show the mealContainer
  mealTrigger.addEventListener("click", function (event) {
    // stopPropagation is used to prevent the event from bubbling up to the bodyContainer
    event.stopPropagation();
    mealContainer.classList.toggle("show");
    mealOptions.innerHTML = "";
    // for each loop to create an option element for each meal option and append it to mealOptions once the user clicks on the mealTrigger button
    localStorageKeys.forEach((key) => {
      const option = document.createElement("li");
      const link = document.createElement("a");
      link.href = "#" + key;
      link.textContent = key;
      option.appendChild(link);
      mealOptions.appendChild(option);
      // when the user clicks on a meal option it will load the meal plan
      link.addEventListener("click", function () {
        const selectedKey = this.textContent;
        const selectedValue = localStorage.getItem(selectedKey);
        // if statement to check if selectedValue exists and if it does it will load the meal plan
        if (selectedValue) {
          const dividedMeals = JSON.parse(selectedValue);
          loadMealPlan(dividedMeals);
          mealContainer.classList.toggle("show");
        }
      });
    });
  });
// when you click on the workOutTrigger button it will show the workOutContainer
  workOutTrigger.addEventListener("click", function (event) {
    event.stopPropagation();
    workOutContainer.classList.toggle("show");
  });
// when you click on the workOutOptions button it will clear the mainContainer and create the exercise plan
  workOutOptions.addEventListener("click", function (event) {
    event.preventDefault();
    clearMainContainer();
    createExercisePlan(event.target.getAttribute("value"));
    workOutContainer.classList.toggle("show");
  });

  document.getElementById("reload-page").addEventListener("click", function () {
    location.reload();
  });
});
export { startFunction };
