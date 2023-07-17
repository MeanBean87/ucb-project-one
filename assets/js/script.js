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
=======
  let tdee = calculateTDEE(weight, feet, inches, age, gender, activityLevel);
  let macroNutrients = calculateMacroNutrients(tdee, goal);
  console.log(divideMeals(tdee, macroNutrients));
  return divideMeals(tdee, macroNutrients);
};

const calculateTDEE = (
  weight,
  feet,
  inches,
  age,
  gender,
  selectedActivityLevel
) => {
  let convertedWeight = convertPoundsToKilograms(weight);
  let convertedHeight = convertInchesToCentimeters(
    convertImpHeightToBaseInches(feet, inches)
  );

  if (gender === "Female") {
    return (
      calculateFemaleBMR(convertedWeight, convertedHeight, age) *
      activityLevel[selectedActivityLevel]
    );
  } else {
    return (
      calculateMaleBMR(convertedWeight, convertedHeight, age) *
      activityLevel[selectedActivityLevel]
    );
  }
};

const calculateMacroNutrients = (tdee, goal) => {
  let carbohydrates;
  let protein;
  let fat;

  if (goal === "Lose Weight") {
    carbohydrates = 0.4;
    protein = 0.4;
    fat = 0.2;
  } else if (goal === "Gain Weight") {
    carbohydrates = 0.5;
    protein = 0.3;
    fat = 0.2;
  } else if (goal === "Build Muscle") {
    carbohydrates = 0.45;
    protein = 0.4;
    fat = 0.15;
  } else {
    carbohydrates = 0.45;
    protein = 0.3;
    fat = 0.25;
  }

  if (tdee >= 2500) {
    carbohydrates += 0.05;
    fat -= 0.05;
  } else if (tdee <= 1500) {
    carbohydrates -= 0.05;
    fat += 0.05;
  }

  return { carbohydrates: carbohydrates, protein: protein, fat: fat };
};

const divideMeals = (tdee, macroNutrients) => {
  const { carbohydrates, protein, fat } = macroNutrients;

  const caloriesFromCarbohydrates = Math.round(tdee * carbohydrates);
  const caloriesFromProtein = Math.round(tdee * protein);
  const caloriesFromFat = Math.round(tdee * fat);

  const gramsOfCarbohydrates = Math.round(caloriesFromCarbohydrates / 4);
  const gramsOfProtein = Math.round(caloriesFromProtein / 4);
  const gramsOfFat = Math.round(caloriesFromFat / 9);
  console.log(gramsOfCarbohydrates, gramsOfProtein, gramsOfFat);

  const meals = {
    breakfast: {
      carbohydrates: Math.round(gramsOfCarbohydrates * 0.25),
      protein: Math.round(gramsOfProtein * 0.25),
      fat: Math.round(gramsOfFat * 0.25),
    },
    lunch: {
      carbohydrates: parseInt(Math.round(gramsOfCarbohydrates * 0.35)),
      protein: Math.round(gramsOfProtein * 0.35),
      fat: Math.round(gramsOfFat * 0.35),
    },
    dinner: {
      carbohydrates: Math.round(gramsOfCarbohydrates * 0.3),
      protein: Math.round(gramsOfProtein * 0.3),
      fat: Math.round(gramsOfFat * 0.3),
    },
    snacks: {
      carbohydrates: Math.round(gramsOfCarbohydrates * 0.1),
      protein: Math.round(gramsOfProtein * 0.1),
      fat: Math.round(gramsOfFat * 0.1),
    },
    "tdee": tdee
  };

  return meals;
};

//================================================================================================

const clearMainContainer = () => {
  while (mainContainer.firstChild) {
    mainContainer.removeChild(mainContainer.firstChild);
  }
};

//TDEE QUESTIONNAIRE==============================================================================
const createTDEEQuestionnaire = () => {
  //Create Form
  const tdeeQuestionnaire = document.createElement("form");
  tdeeQuestionnaire.setAttribute("id", "tdee-questionnaire");
  tdeeQuestionnaire.setAttribute("class", "tdee-questionnaire");
  tdeeQuestionnaire.setAttribute(
    "style",
    "display: flex; flex-direction: column; align-items: center;"
  );
  mainContainer.appendChild(tdeeQuestionnaire);

  //Form Title
  const tdeeQuestionnaireTitle = document.createElement("h2");
  tdeeQuestionnaireTitle.setAttribute("id", "tdee-questionnaire-title");
  tdeeQuestionnaireTitle.setAttribute("class", "tdee-questionnaire-title font-extrabold text-white pt-10");
  tdeeQuestionnaireTitle.textContent = "TDEE Questionnaire";
  tdeeQuestionnaire.appendChild(tdeeQuestionnaireTitle);

  //Form Description
  const tdeeQuestionnaireDescription = document.createElement("p");
  tdeeQuestionnaireDescription.setAttribute(
    "id",
    "tdee-questionnaire-description"
  );
  tdeeQuestionnaireDescription.setAttribute(
    "class",
    "tdee-questionnaire-description font-extrabold text-white pt-5"
  );
  tdeeQuestionnaireDescription.textContent =
    "Please answer the following questions to calculate your TDEE:";
  tdeeQuestionnaire.appendChild(tdeeQuestionnaireDescription);

  //Form Name Input Label
  const tdeeQuestionnaireName = document.createElement("label");
  tdeeQuestionnaireName.setAttribute("for", "tdee-questionnaire-name");
  tdeeQuestionnaireName.setAttribute("id", "tdee-questionnaire-name-label");
  tdeeQuestionnaireName.setAttribute("class", "tdee-questionnaire-name-label font-extrabold text-white pt-5");
  tdeeQuestionnaireName.textContent = "Name: ";
  tdeeQuestionnaire.appendChild(tdeeQuestionnaireName);

  //Form Name Input
  const tdeeQuestionnaireNameInput = document.createElement("input");
  tdeeQuestionnaireNameInput.setAttribute("type", "text");
  tdeeQuestionnaireNameInput.setAttribute("id", "tdee-questionnaire-name");
  tdeeQuestionnaireNameInput.setAttribute("class", "tdee-questionnaire-name");
  tdeeQuestionnaireNameInput.setAttribute("name", "tdee-questionnaire-name");
  tdeeQuestionnaireNameInput.setAttribute("placeholder", "Enter your name");
  tdeeQuestionnaire.appendChild(tdeeQuestionnaireNameInput);

  //Form Age Input Label
  const tdeeQuestionnaireAge = document.createElement("label");
  tdeeQuestionnaireAge.setAttribute("for", "tdee-questionnaire-age");
  tdeeQuestionnaireAge.setAttribute("id", "tdee-questionnaire-age-label");
  tdeeQuestionnaireAge.setAttribute("class", "tdee-questionnaire-age-label font-extrabold text-white pt-3");
  tdeeQuestionnaireAge.textContent = "Age: ";
  tdeeQuestionnaire.appendChild(tdeeQuestionnaireAge);

  //Form Age Input
  const tdeeQuestionnaireAgeInput = document.createElement("input");
  tdeeQuestionnaireAgeInput.setAttribute("type", "number");
  tdeeQuestionnaireAgeInput.setAttribute("id", "tdee-questionnaire-age");
  tdeeQuestionnaireAgeInput.setAttribute("class", "tdee-questionnaire-age");
  tdeeQuestionnaireAgeInput.setAttribute("placeholder", "Age in years");
  tdeeQuestionnaire.appendChild(tdeeQuestionnaireAgeInput);

  //Form Gender Input Label
  const tdeeQuestionnaireGender = document.createElement("label");
  tdeeQuestionnaireGender.setAttribute("for", "tdee-questionnaire-gender");
  tdeeQuestionnaireGender.setAttribute("id", "tdee-questionnaire-gender-label");
  tdeeQuestionnaireGender.setAttribute(
    "class",
    "tdee-questionnaire-gender-label font-extrabold text-white pt-2"
  );
  tdeeQuestionnaireGender.textContent = "Please select your gender: ";
  tdeeQuestionnaire.appendChild(tdeeQuestionnaireGender);

  //Form Gender Input
  const tdeeQuestionnaireGenderInput = document.createElement("select");
  tdeeQuestionnaireGenderInput.setAttribute("id", "tdee-questionnaire-gender");
  tdeeQuestionnaireGenderInput.setAttribute(
    "class",
    "tdee-questionnaire-gender"
  );

  // Gender Options
  const options = ["Male", "Female", "Other"];
  for (const option of options) {
    const genderOption = document.createElement("option");
    genderOption.setAttribute("value", option);
    genderOption.textContent = option;
    tdeeQuestionnaireGenderInput.appendChild(genderOption);
  }

  tdeeQuestionnaire.appendChild(tdeeQuestionnaireGenderInput);

  //Form Height Div
  const tdeeQuestionnaireHeightInput = document.createElement("div");
  tdeeQuestionnaireHeightInput.setAttribute("id", "tdee-questionnaire-height");
  tdeeQuestionnaireHeightInput.setAttribute(
    "class",
    "tdee-questionnaire-height"
  );
  tdeeQuestionnaire.appendChild(tdeeQuestionnaireHeightInput);

  //Form Height Input Label
  const tdeeQuestionnaireHeightLabel = document.createElement("label");
  tdeeQuestionnaireHeightLabel.setAttribute(
    "for",
    "tdee-questionnaire-height-input"
  );
  tdeeQuestionnaireHeightLabel.setAttribute(
    "id",
    "tdee-questionnaire-height-label"
  );
  tdeeQuestionnaireHeightLabel.textContent = "Height: ";
  tdeeQuestionnaireHeightLabel.setAttribute(
    "class",
    "tdee-questionnaire-height-label font-extrabold text-white pt-5"
  );
  tdeeQuestionnaireHeightInput.appendChild(tdeeQuestionnaireHeightLabel);

  //Form Feet Input
  const tdeeQuestionnaireFeetInput = document.createElement("input");
  tdeeQuestionnaireFeetInput.setAttribute("type", "number");
  tdeeQuestionnaireFeetInput.setAttribute("id", "tdee-questionnaire-feet");
  tdeeQuestionnaireFeetInput.setAttribute("class", "tdee-questionnaire-feet");
  tdeeQuestionnaireFeetInput.setAttribute("placeholder", "Feet");
  tdeeQuestionnaireHeightInput.appendChild(tdeeQuestionnaireFeetInput);

  //Form Inches Input
  const tdeeQuestionnaireInchesInput = document.createElement("input");
  tdeeQuestionnaireInchesInput.setAttribute("type", "number");
  tdeeQuestionnaireInchesInput.setAttribute("id", "tdee-questionnaire-inches");
  tdeeQuestionnaireInchesInput.setAttribute(
    "class",
    "tdee-questionnaire-inches"
  );
  tdeeQuestionnaireInchesInput.setAttribute("placeholder", "Inches");
  tdeeQuestionnaireHeightInput.appendChild(tdeeQuestionnaireInchesInput);

  //Form Weight Input Label
  const tdeeQuestionnaireWeight = document.createElement("label");
  tdeeQuestionnaireWeight.setAttribute("for", "tdee-questionnaire-weight");
  tdeeQuestionnaireWeight.setAttribute("id", "tdee-questionnaire-weight-label");
  tdeeQuestionnaireWeight.setAttribute(
    "class",
    "tdee-questionnaire-weight-label font-extrabold text-white pt-5"
  );
  tdeeQuestionnaireWeight.textContent = "Weight: ";
  tdeeQuestionnaire.appendChild(tdeeQuestionnaireWeight);

  //Form Weight Input
  const tdeeQuestionnaireWeightInput = document.createElement("input");
  tdeeQuestionnaireWeightInput.setAttribute("type", "number");
  tdeeQuestionnaireWeightInput.setAttribute("id", "tdee-questionnaire-weight");
  tdeeQuestionnaireWeightInput.setAttribute(
    "class",
    "tdee-questionnaire-weight"
  );
  tdeeQuestionnaireWeightInput.setAttribute("placeholder", "Weight in lbs");
  tdeeQuestionnaire.appendChild(tdeeQuestionnaireWeightInput);

  //Form Activity Level Input Label
  const tdeeQuestionnaireActivityLevel = document.createElement("label");
  tdeeQuestionnaireActivityLevel.setAttribute(
    "for",
    "tdee-questionnaire-activity-level"
  );
  tdeeQuestionnaireActivityLevel.setAttribute(
    "id",
    "tdee-questionnaire-activity-level-label"
  );
  tdeeQuestionnaireActivityLevel.setAttribute(
    "class",
    "tdee-questionnaire-activity-level-label font-extrabold text-white pt-5"
  );
  tdeeQuestionnaireActivityLevel.textContent =
    "Please select your activity level: ";
  tdeeQuestionnaire.appendChild(tdeeQuestionnaireActivityLevel);

  //Form Activity Level Input
  const tdeeQuestionnaireActivityLevelInput = document.createElement("select");
  tdeeQuestionnaireActivityLevelInput.setAttribute(
    "id",
    "tdee-questionnaire-activity-level"
  );
  tdeeQuestionnaireActivityLevelInput.setAttribute(
    "class",
    "tdee-questionnaire-activity-level"
  );

  // Activity Level Options
  for (const level in activityLevel) {
    const activityLevelOption = document.createElement("option");
    activityLevelOption.setAttribute("value", level);
    activityLevelOption.textContent = level;
    tdeeQuestionnaireActivityLevelInput.appendChild(activityLevelOption);
  }
  tdeeQuestionnaire.appendChild(tdeeQuestionnaireActivityLevelInput);

  //Form Goal Input Label
  const mealQuestionnaireCalories = document.createElement("label");
  mealQuestionnaireCalories.setAttribute("for", "meal-questionnaire-calories");
  mealQuestionnaireCalories.setAttribute(
    "id",
    "meal-questionnaire-calories-label"
  );
  mealQuestionnaireCalories.setAttribute(
    "class",
    "meal-questionnaire-calories-label font-extrabold text-white pt-5"
  );
  mealQuestionnaireCalories.textContent = "What are your fitness goals: ";
  tdeeQuestionnaire.appendChild(mealQuestionnaireCalories);

  //Form Goal Input
  const mealQuestionnaireCaloriesInput = document.createElement("select");
  mealQuestionnaireCaloriesInput.setAttribute(
    "id",
    "meal-questionnaire-calories"
  );
  mealQuestionnaireCaloriesInput.setAttribute(
    "class",
    "meal-questionnaire-calories"
  );

  //Goal Options
  for (const option of goalOptions) {
    const goalOption = document.createElement("option");
    goalOption.setAttribute("value", option);
    goalOption.textContent = option;
    mealQuestionnaireCaloriesInput.appendChild(goalOption);
  }
  tdeeQuestionnaire.appendChild(mealQuestionnaireCaloriesInput);

  //Form Submit Button
  const tdeeQuestionnaireSubmit = document.createElement("button");
  tdeeQuestionnaireSubmit.setAttribute("type", "submit");
  tdeeQuestionnaireSubmit.setAttribute("id", "tdee-questionnaire-submit");
  tdeeQuestionnaireSubmit.setAttribute("class", "tdee-questionnaire-submit  font-extrabold text-white pt-5");
  tdeeQuestionnaireSubmit.textContent = "Submit";
  tdeeQuestionnaire.appendChild(tdeeQuestionnaireSubmit);

  //Form Submit Event Listener
  tdeeQuestionnaire.addEventListener("submit", function (event) {
    event.preventDefault();
    const age = parseInt(
      document.getElementById("tdee-questionnaire-age").value
    );
    const gender = document.getElementById("tdee-questionnaire-gender").value;
    const feet = parseInt(
      document.getElementById("tdee-questionnaire-feet").value
    );
    const inches = parseInt(
      document.getElementById("tdee-questionnaire-inches").value
    );
    const weight = parseInt(
      document.getElementById("tdee-questionnaire-weight").value
    );
    const activityLevel = document.getElementById(
      "tdee-questionnaire-activity-level"
    ).value;

    const goal = document.getElementById("meal-questionnaire-calories").value;

    startFunction(weight, feet, inches, age, gender, activityLevel, goal);
  });
};

//Global Event Listeners===========================================================================
mealPlanGenerator.addEventListener("click", function (event) {
  event.preventDefault();
  clearMainContainer();
  createTDEEQuestionnaire();
});

const logoImage = document.querySelector("img");

// Add event listener to the image
logoImage.addEventListener("click", function (event) {
  event.preventDefault();
  clearMainContainer();
  createTDEEQuestionnaire();
});
//================================================================================================

