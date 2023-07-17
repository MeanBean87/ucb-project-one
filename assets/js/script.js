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

//================================================================================================

const createHomePage = () => {
  const homePage = document.createElement("div");
  homePage.setAttribute("id", "home-page");
  homePage.setAttribute("class", "home-page");
  homePage.setAttribute(
    "style",
    "display: flex; flex-direction: column; align-items: center;"
  );
  bodyContainer.appendChild(homePage);

  const homePageImage = document.createElement("img");
  homePageImage.setAttribute("id", "home-page-image");
  homePageImage.setAttribute("class", "home-page-image");
  homePageImage.setAttribute("src", "./assets/Images/logo.png");
  homePageImage.setAttribute("alt", "Meal Plan Generator Logo");
  bodyContainer.appendChild(homePageImage);

  const homePageDescription = document.createElement("p");
  homePageDescription.setAttribute("id", "home-page-description");
  homePageDescription.setAttribute("class", "home-page-description");
  homePageDescription.textContent =
    "Welcome to the Meal Plan Generator! We will help you generate a meal plan based on your goals and body type. Click Meal Plan Generator on the nav bar to get started!";
  bodyContainer.appendChild(homePageDescription);

  const homeLink = document.getElementById("home-link");

  homeLink.addEventListener("click", function (event) {
    event.preventDefault();
    clearMainContainer();
    createHomePage();
  });
};

createHomePage();

//Global Event Listeners===========================================================================
mealPlanGenerator.addEventListener("click", function (event) {
  event.preventDefault();
  createTDEEQuestionnaire();
});
//================================================================================================

export { startFunction };