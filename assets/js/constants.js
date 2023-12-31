const mainContainer = document.getElementById("main-container");
const homeLink = document.getElementById("home-link");
const mealOptions = document.getElementById("meal-options");
const mealTrigger = document.getElementById("meal-trigger");
const mealContainer = document.getElementById("meal-container");
const workOutContainer = document.getElementById("workout-container");
const workOutTrigger = document.getElementById("workout-trigger");
const workOutOptions = document.getElementById("workout-options");
const bodyContainer = document.querySelector(".body-container");
const mealPlanGenerator = document.getElementById("meal-plan-generator");

const localStorageKeys = Object.keys(localStorage);
// activityLevel object with activity level options and their values to be used in calculateTDEE function
const activityLevel = {
  Sedentary: 1.2, //(little to no exercise + work a desk job) = 1.2
  "Lightly Active": 1.375, // (light exercise 1-3 days / week)
  "Moderately Active": 1.55, //(moderate exercise 3-5 days / week
  "Very Active": 1.725, //(heavy exercise 5-7 days / week)
  "Extremely Active": 1.9, //(very heavy exercise, hard labor job, training 2x / day)
};
// goalOptions array with goal options to be used in calculateMacroNutrients function
const goalOptions = [
  "Lose Weight",
  "Maintain Weight",
  "Gain Weight",
  "Build Muscle",
];

const categories = [
  "biscuits and cookies",
  "bread",
  "desserts",
  "egg",
  "main course",
  "pancake",
  "pasta",
  "pastry",
  "pies and tarts",
  "pizza",
  "preps",
  "preserve",
  "salad",
  "sandwiches",
  "seafood",
  "side dish",
  "soup",
  "special occasions",
  "starter",
  "sweets"
];

export {
  activityLevel,
  goalOptions,
  mainContainer,
  homeLink,
  mealContainer,
  mealOptions,
  mealTrigger,
  workOutContainer,
  workOutTrigger,
  workOutOptions,
  bodyContainer,
  mealPlanGenerator,
  localStorageKeys,
  categories
};
