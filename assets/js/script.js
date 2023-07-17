import { calculateTDEE, calculateMacroNutrients, divideMeals, getFood} from "./calculateTdee.js";
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
      method: 'GET',
      headers: {
        'X-Api-Key': `${apiKey}`,  
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error: ' + response.status);
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error('Error:', error);
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
    createMealPlan(dividedMeals, mealObj);
  } catch (error) {
    console.error("An error occurred during startFunction:", error);
  }
};

function clearMainContainer() {
  // Get the mainContainer element
  var mainContainer = document.getElementById('main-container');

  // Remove all child elements from the mainContainer
  while (mainContainer.firstChild) {
    mainContainer.removeChild(mainContainer.firstChild);
  }
}

const homeLink = document.getElementById('home-link');

homeLink.addEventListener('click', function (event) {
  event.preventDefault();
  setTimeout(() => {
    clearMainContainer(); createTDEEQuestionnaire();
  }, 2000); 
});

mealPlanGenerator.addEventListener("click", function (event) {
  event.preventDefault();
  bodyContainer.i
  clearMainContainer()
  createTDEEQuestionnaire();
});
//================================================================================================



export { startFunction };