const mainContainer = document.getElementById("main-container");
const mealPlanGenerator = document.getElementById("meal-plan-generator");

let tdee = 0;

//Fetch functions==================================================================================
const fetchEdamamObj = async (queryString) => {
  const appId = `ea339611`;
  const appKey = `40023aebe29c8284c820e11ded63b70f`;
  const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(
    queryString
  )}&app_id=${appId}&app_key=${appKey}`;

  try {
    const response = await fetch(`${url}${query}`);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      throw new Error(`Error: ${response.statusText} (${response.status})`);
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchExerciseObj = async (queryString) => {};
//================================================================================================

//TDEE Algorithm==================================================================================
const values = {
  dietValues: [
    "balanced",
    "high-fiber",
    "high-protein",
    "low-carb",
    "low-fat",
    "low-sodium",
  ],
  healthValues: [
    "alcohol-cocktail",
    "alcohol-free",
    "celery-free",
    "crustacean-free",
    "dairy-free",
    "egg-free",
    "fish-free",
    "fodmap-free",
    "gluten-free",
    "immuno-supportive",
    "keto-friendly",
    "kidney-friendly",
    "kosher",
    "low-fat-abs",
    "low-potassium",
    "low-sugar",
    "lupine-free",
    "mediterranean",
    "mollusk-free",
    "mustard-free",
    "no-oil-added",
    "paleo",
    "peanut-free",
    "pecatarian",
    "pork-free",
    "red-meat-free",
    "sesame-free",
    "shellfish-free",
    "soy-free",
    "sugar-conscious",
    "sulfite-free",
    "tree-nut-free",
    "vegan",
    "vegetarian",
    "wheat-free",
  ],
  cuisineType: [
    "American",
    "Asian",
    "British",
    "Caribbean",
    "Central Europe",
    "Chinese",
    "Eastern Europe",
    "French",
    "Indian",
    "Italian",
    "Japanese",
    "Kosher",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "South American",
    "South East Asian",
  ],
  mealType: ["Breakfast", "Lunch", "Dinner", "Snack", "Teatime"],
  dishType: [
    "Biscuits and cookies",
    "Bread",
    "Cereals",
    "Condiments and sauces",
    "Desserts",
    "Drinks",
    "Main course",
    "Pancake",
    "Preps",
    "Preserve",
    "Salad",
    "Sandwiches",
    "Side dish",
    "Soup",
    "Starter",
    "Sweets",
  ],
  imageSize: ["Large", "Regular", "Small", "Thumbnail"],
  random: ["true", "false"],
  field: [
    "uri",
    "label",
    "image",
    "images",
    "source",
    "url",
    "shareAs",
    "yield",
    "dietLabels",
    "healthLabels",
    "cautions",
    "ingredientLines",
    "ingredients",
    "calories",
    "glycemicIndex",
    "totalCO2Emissions",
    "co2EmissionsClass",
    "totalWeight",
    "totalTime",
    "cuisineType",
    "mealType",
    "dishType",
    "totalNutrients",
    "totalDaily",
    "digest",
    "tags",
    "externalId",
  ],
};

const activityLevel = {
  Sedentary: 1.2, //(little to no exercise + work a desk job) = 1.2
  "Lightly Active": 1.375, // (light exercise 1-3 days / week)
  "Moderately Active": 1.55, //(moderate exercise 3-5 days / week
  "Very Active": 1.725, //(heavy exercise 5-7 days / week)
  "Extremely Active": 1.9, //(very heavy exercise, hard labor job, training 2x / day)
};

const goalOptions = [
  "Lose Weight",
  "Maintain Weight",
  "Gain Weight",
  "Build Muscle",
];

const convertImpHeightToBaseInches = (feet, inches) => {
  return feet * 12 + inches;
};

const convertInchesToCentimeters = (inches) => {
  return inches * 2.54;
};

const convertPoundsToKilograms = (pounds) => {
  return pounds * 0.45359237;
};

const calculateFemaleBMR = (weight, height, age) => {
  return 655 + 9.6 * weight + 1.8 * height - 4.7 * age;
};

const calculateMaleBMR = (weight, height, age) => {
  return 66 + 13.7 * weight + 5 * height - 6.8 * age;
};

const startFunction = (
  weight,
  feet,
  inches,
  age,
  gender,
  activityLevel,
  goal
) => {
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
  tdeeQuestionnaireTitle.setAttribute("class", "tdee-questionnaire-title");
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
    "tdee-questionnaire-description"
  );
  tdeeQuestionnaireDescription.textContent =
    "Please answer the following questions to calculate your TDEE:";
  tdeeQuestionnaire.appendChild(tdeeQuestionnaireDescription);

  //Form Name Input Label
  const tdeeQuestionnaireName = document.createElement("label");
  tdeeQuestionnaireName.setAttribute("for", "tdee-questionnaire-name");
  tdeeQuestionnaireName.setAttribute("id", "tdee-questionnaire-name-label");
  tdeeQuestionnaireName.setAttribute("class", "tdee-questionnaire-name-label");
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
  tdeeQuestionnaireAge.setAttribute("class", "tdee-questionnaire-age-label");
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
    "tdee-questionnaire-gender-label"
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
    "tdee-questionnaire-weight-label"
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
    "tdee-questionnaire-activity-level-label"
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
    "meal-questionnaire-calories-label"
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
  tdeeQuestionnaireSubmit.setAttribute("class", "tdee-questionnaire-submit");
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

//================================================================================================

//Create Meal Plan==================================================================================
const searchforMeal = async (query) => {
  clearMainContainer();
};

//================================================================================================
const createMealSearchQuestionnaire = () => {
  const mealSearchQuestionnaire = document.createElement("form");
  mealSearchQuestionnaire.setAttribute("id", "meal-search-questionnaire");
  mealSearchQuestionnaire.setAttribute("class", "meal-search-questionnaire");
  mealSearchQuestionnaire.setAttribute(
    "style",
    "display: flex; flex-direction: column; align-items: center;"
  );
  mainContainer.appendChild(mealSearchQuestionnaire);

  //Form Title
  const mealSearchQuestionnaireTitle = document.createElement("h2");
  mealSearchQuestionnaireTitle.setAttribute(
    "id",
    "meal-search-questionnaire-title"
  );
  mealSearchQuestionnaireTitle.setAttribute(
    "class",
    "meal-search-questionnaire-title"
  );
  mealSearchQuestionnaireTitle.textContent = "Meal Search Questionnaire";
  mealSearchQuestionnaire.appendChild(mealSearchQuestionnaireTitle);

  // Meal Type
  const mealTypeContainer = document.createElement("div");
  mealTypeContainer.setAttribute("class", "meal-type-container");
  mealTypeContainer.setAttribute(
    "style",
    "display: flex; flex-direction: column; align-items: center;"
  );
  mealSearchQuestionnaire.appendChild(mealTypeContainer);

  const mealTypeLabel = document.createElement("label");
  mealTypeLabel.setAttribute("for", "mealType");
  mealTypeLabel.textContent = "Meal Type: ";
  mealTypeContainer.appendChild(mealTypeLabel);

  const mealTypeList = document.createElement("ul");
  mealTypeList.setAttribute("class", "meal-type-list");

  for (const value of values.mealType) {
    const listItem = document.createElement("li");
    listItem.setAttribute("class", "meal-type-list-item");

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("name", "mealType");
    checkbox.setAttribute("value", value);
    listItem.appendChild(checkbox);

    const label = document.createElement("label");
    label.setAttribute("for", value);
    label.textContent = value;
    listItem.appendChild(label);

    mealTypeList.appendChild(listItem);
  }

  mealTypeContainer.appendChild(mealTypeList);

  // Allergies / Health Concerns
  const allergyContainer = document.createElement("div");
  allergyContainer.setAttribute(
    "class",
    "allergy-container"
  );
  allergyContainer.setAttribute(
    "style",
    "display: flex; flex-direction: column; align-items: center;"
  );
  mealSearchQuestionnaire.appendChild(allergyContainer);

  const allergyLabel = document.createElement("label");
  allergyLabel.setAttribute("for", "allergy-values");
  allergyLabel.textContent = "Allergies / Health Concerns: ";
  allergyContainer.appendChild(allergyLabel);

  const allergyList = document.createElement("ul");
  allergyList.setAttribute("class", "allergy-list");

  for (const value of values.healthValues) {
    const listItem = document.createElement("li");
    listItem.setAttribute("class", "allergy-list-item");

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("name", "allergy-values");
    checkbox.setAttribute("value", value);
    listItem.appendChild(checkbox);

    const label = document.createElement("label");
    label.setAttribute("for", value);
    label.textContent = value;
    listItem.appendChild(label);

    allergyList.appendChild(listItem);
  }

  allergyContainer.appendChild(allergyList);

  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.setAttribute("id", "meal-search-submit");
  submitButton.setAttribute("class", "meal-search-submit");
  submitButton.textContent = "Submit";
  mealSearchQuestionnaire.appendChild(submitButton);

  submitButton.addEventListener("click", function (event) {
    event.preventDefault();

    const allergyValues = Array.from(document.getElementsByName("allergy-values"))
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    const mealTypeValues = Array.from(document.getElementsByName("mealType"))
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    const query = {
      allergies: allergyValues,
      mealTypes: mealTypeValues,
    };

    // searchForMeal(query);

    // // const searchforMeal = async (query) => {
    // //   console.log("Searching for meals with query:", query);
    // //   // Perform actual search for meals based on the query
    // // };
  });
};

//Global Event Listeners===========================================================================
mealPlanGenerator.addEventListener("click", function (event) {
  event.preventDefault();
  clearMainContainer();
  createTDEEQuestionnaire();
  createMealSearchQuestionnaire();
});

//================================================================================================

const createHomePage = () => {
  const homePage = document.createElement("div");
  homePage.setAttribute("id", "home-page");
  homePage.setAttribute("class", "home-page");
  homePage.setAttribute(
    "style",
    "display: flex; flex-direction: column; align-items: center;"
  );
  mainContainer.appendChild(homePage);

  const homePageTitle = document.createElement("h1");
  homePageTitle.setAttribute("id", "home-page-title");
  homePageTitle.setAttribute("class", "home-page-title");
  homePageTitle.textContent = "Meal Plan Generator";
  homePage.appendChild(homePageTitle);

  const homePageDescription = document.createElement("p");
  homePageDescription.setAttribute("id", "home-page-description");
  homePageDescription.setAttribute("class", "home-page-description");
  homePageDescription.textContent =
    "Welcome to the Meal Plan Generator! We will help you generate a meal plan based on your goals and body type. Click Meal Plan Generator on the nav bar to get started!";
  homePage.appendChild(homePageDescription);

  const homePageImage = document.createElement("img");
  homePageImage.setAttribute("id", "home-page-image");
  homePageImage.setAttribute("class", "home-page-image");
  homePageImage.setAttribute("src", "./assets/Images/logo.png");
  homePageImage.setAttribute("alt", "Meal Plan Generator Logo");
  homePage.appendChild(homePageImage);

  const homeLink = document.getElementById("home-link");

  homeLink.addEventListener("click", function (event) {
    event.preventDefault();
    clearMainContainer();
    createHomePage();
  });
};
  createHomePage();
