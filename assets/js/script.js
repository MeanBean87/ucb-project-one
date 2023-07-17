import { calculateTDEE, calculateMacroNutrients, divideMeals, getFood} from "./calculateTdee.js";
import { createTDEEQuestionnaire } from "./tdeeQuestionnaire.js";
import { createMealPlan } from "./createMealPlan.js";

const bodyContainer = document.querySelector(".body-container");
const mealPlanGenerator = document.getElementById("meal-plan-generator");
const fetchExerciseObj = async (queryString) => {};
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
    const dateString = new Date().toISOString();
    const appendedName = name + " " + dateString;
    localStorage.setItem(appendedName, JSON.stringify(dividedMeals));
    createMealPlan(dividedMeals);
  } catch (error) {
    console.error("An error occurred during startFunction:", error);
  }
};




mealPlanGenerator.addEventListener("click", function (event) {
  event.preventDefault();
  bodyContainer.i
  createTDEEQuestionnaire();
});
//================================================================================================

export { startFunction };