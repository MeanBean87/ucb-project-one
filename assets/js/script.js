const mainContainer = document.getElementById("main-container");
const mealPlanGenerator = document.getElementById("meal-plan-generator");


//TODO: Refine parameters to suit our needs.
const fetchMealDbObj = async (query) => {
  const url =
    `https://www.themealdb.com/api/json/v1/1/search.php?s=` +
    encodeURIComponent(query);
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

//TODO: Refine parameters to suit our needs.
const fetchCalorieNinjas = async (query) => {
  const apiKey = "aPOBA91RAEupAPbEjV0ibQ==1WKhc49resmT47Kr";
  const url =
    `https://api.calorieninjas.com/v1/nutrition?query=` +
    encodeURIComponent(query);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText} (${response.status})`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

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

const calculateTDEE = (weight, feet, inches, age, gender, activityLevel) => {
  let convertedWeight = convertPoundsToKilograms(weight);
  let convertedHeight = convertInchesToCentimeters(convertImpHeightToBaseInches(feet, inches));

  if (gender === "Female") {
    return calculateFemaleBMR(convertedWeight, convertedHeight, age) * activityLevel;
  } else {
    return calculateMaleBMR(convertedWeight, convertedHeight, age) * activityLevel;
  }
};

const caloriesPerMeal = (calories, numberOfMeals) => {
  return calories / numberOfMeals;
};

//================================================================================================

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

//================================================================================================

const createTDEEQuestionnaire = () => {
  const tdeeQuestionnaire = document.createElement("form");
  tdeeQuestionnaire.setAttribute("id", "tdee-questionnaire");
  tdeeQuestionnaire.setAttribute("class", "tdee-questionnaire");
  mainContainer.appendChild(tdeeQuestionnaire);

  const tdeeQuestionnaireTitle = document.createElement("h2");
  tdeeQuestionnaireTitle.setAttribute("id", "tdee-questionnaire-title");
  tdeeQuestionnaireTitle.setAttribute("class", "tdee-questionnaire-title");
  tdeeQuestionnaireTitle.textContent = "TDEE Questionnaire";
  tdeeQuestionnaire.appendChild(tdeeQuestionnaireTitle);

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

  const tdeeQuestionnaireName = document.createElement("label");
  tdeeQuestionnaireName.setAttribute("for", "tdee-questionnaire-name");
  tdeeQuestionnaireName.setAttribute("id", "tdee-questionnaire-name-label");
  tdeeQuestionnaireName.setAttribute("class", "tdee-questionnaire-name-label");
  tdeeQuestionnaireName.textContent = "Name: ";
  tdeeQuestionnaire.appendChild(tdeeQuestionnaireName);

  const tdeeQuestionnaireNameInput = document.createElement("input");
  tdeeQuestionnaireNameInput.setAttribute("type", "text");
  tdeeQuestionnaireNameInput.setAttribute("id", "tdee-questionnaire-name");
  tdeeQuestionnaireNameInput.setAttribute("class", "tdee-questionnaire-name");
  tdeeQuestionnaireNameInput.setAttribute("name", "tdee-questionnaire-name");
  tdeeQuestionnaireNameInput.setAttribute("placeholder", "Enter your name");
  tdeeQuestionnaire.appendChild(tdeeQuestionnaireNameInput);

  const tdeeQuestionnaireAge = document.createElement("label");
  tdeeQuestionnaireAge.setAttribute("for", "tdee-questionnaire-age");
  tdeeQuestionnaireAge.setAttribute("id", "tdee-questionnaire-age-label");
  tdeeQuestionnaireAge.setAttribute("class", "tdee-questionnaire-age-label");
  tdeeQuestionnaireAge.textContent = "Age: ";
  tdeeQuestionnaire.appendChild(tdeeQuestionnaireAge);

  const tdeeQuestionnaireAgeInput = document.createElement("input");
  tdeeQuestionnaireAgeInput.setAttribute("type", "number");
  tdeeQuestionnaireAgeInput.setAttribute("id", "tdee-questionnaire-age");
  tdeeQuestionnaireAgeInput.setAttribute("class", "tdee-questionnaire-age");
  tdeeQuestionnaire.appendChild(tdeeQuestionnaireAgeInput);

  const tdeeQuestionnaireGender = document.createElement("label");
  tdeeQuestionnaireGender.setAttribute("for", "tdee-questionnaire-gender");
  tdeeQuestionnaireGender.setAttribute("id", "tdee-questionnaire-gender-label");
  tdeeQuestionnaireGender.setAttribute("class", "tdee-questionnaire-gender-label");
  tdeeQuestionnaireGender.textContent = "Please select your gender: ";
  tdeeQuestionnaire.appendChild(tdeeQuestionnaireGender);

  const tdeeQuestionnaireGenderInput = document.createElement("select");
  tdeeQuestionnaireGenderInput.setAttribute("id", "tdee-questionnaire-gender");
  tdeeQuestionnaireGenderInput.setAttribute("class", "tdee-questionnaire-gender");

  const options = ["Male", "Female", "Other"];
  for (const option of options) {
    const genderOption = document.createElement("option");
    genderOption.setAttribute("value", option);
    genderOption.textContent = option;
    tdeeQuestionnaireGenderInput.appendChild(genderOption);
  }

  const tdeeQuestionnaireHeight = document.createElement("label");
  tdeeQuestionnaireHeight.setAttribute("for", "tdee-questionnaire-height");
  tdeeQuestionnaireHeight.setAttribute("id", "tdee-questionnaire-height-label");
  tdeeQuestionnaireHeight.setAttribute("class", "tdee-questionnaire-height-label");
  tdeeQuestionnaireHeight.textContent = "Height: ";
  tdeeQuestionnaire.appendChild(tdeeQuestionnaireHeight);

  const tdeeQuestionnaireHeightInput = document.createElement("div");
  tdeeQuestionnaireHeightInput.setAttribute("id", "tdee-questionnaire-height");
  tdeeQuestionnaireHeightInput.setAttribute(
    "class",
    "tdee-questionnaire-height"
  );
  tdeeQuestionnaire.appendChild(tdeeQuestionnaireHeightInput);

  const tdeeQuestionnaireFeetInput = document.createElement("input");
  tdeeQuestionnaireFeetInput.setAttribute("type", "number");
  tdeeQuestionnaireFeetInput.setAttribute("id", "tdee-questionnaire-feet");
  tdeeQuestionnaireFeetInput.setAttribute("class", "tdee-questionnaire-feet");
  tdeeQuestionnaireHeightInput.appendChild(tdeeQuestionnaireFeetInput);

  const tdeeQuestionnaireInchesInput = document.createElement("input");
  tdeeQuestionnaireInchesInput.setAttribute("type", "number");
  tdeeQuestionnaireInchesInput.setAttribute("id", "tdee-questionnaire-inches");
  tdeeQuestionnaireInchesInput.setAttribute(
    "class",
    "tdee-questionnaire-inches"
  );
  tdeeQuestionnaireHeightInput.appendChild(tdeeQuestionnaireInchesInput);

  const tdeeQuestionnaireWeight = document.createElement("label");
  tdeeQuestionnaireWeight.setAttribute("for", "tdee-questionnaire-weight");
  tdeeQuestionnaireWeight.setAttribute("id", "tdee-questionnaire-weight-label");
  tdeeQuestionnaireWeight.setAttribute("class", "tdee-questionnaire-weight-label");
  tdeeQuestionnaireWeight.textContent = "Weight: ";
  tdeeQuestionnaire.appendChild(tdeeQuestionnaireWeight);

  const tdeeQuestionnaireWeightInput = document.createElement("input");
  tdeeQuestionnaireWeightInput.setAttribute("type", "number");
  tdeeQuestionnaireWeightInput.setAttribute("id", "tdee-questionnaire-weight");
  tdeeQuestionnaireWeightInput.setAttribute(
    "class",
    "tdee-questionnaire-weight"
  );
  tdeeQuestionnaire.appendChild(tdeeQuestionnaireWeightInput);

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

  const tdeeQuestionnaireActivityLevelInput = document.createElement("select");
  tdeeQuestionnaireActivityLevelInput.setAttribute("id", "tdee-questionnaire-activity-level");
  tdeeQuestionnaireActivityLevelInput.setAttribute("class", "tdee-questionnaire-activity-level");

  const activityLevel = {
    "Sedentary": 1.2, //(little to no exercise + work a desk job) = 1.2
    "Lightly Active": 1.375, // (light exercise 1-3 days / week)
    "Moderately Active": 1.55, //(moderate exercise 3-5 days / week
    "Very Active": 1.725, //(heavy exercise 5-7 days / week)
    "Extremely Active": 1.9, //(very heavy exercise, hard labor job, training 2x / day)
  };

  for (const level in activityLevel) {
    const activityLevelOption = document.createElement("option");
    activityLevelOption.setAttribute("value", level);
    activityLevelOption.textContent = level;
    tdeeQuestionnaireActivityLevelInput.appendChild(activityLevelOption);
  }

  const tdeeQuestionnaireSubmit = document.createElement("button");
  tdeeQuestionnaireSubmit.setAttribute("type", "submit");
  tdeeQuestionnaireSubmit.setAttribute("id", "tdee-questionnaire-submit");
  tdeeQuestionnaireSubmit.setAttribute(
    "class",
    "tdee-questionnaire-submit"
  );
  tdeeQuestionnaireSubmit.textContent = "Submit";
  tdeeQuestionnaire.appendChild(tdeeQuestionnaireSubmit);

  tdeeQuestionnaire.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log(event.target);

    const age = parseInt(document.getElementById("tdee-questionnaire-age").value);
    const gender = document.getElementById("tdee-questionnaire-gender").value;
    const feet = parseInt(document.getElementById("tdee-questionnaire-feet").value);
    const inches = parseInt(document.getElementById("tdee-questionnaire-inches").value);
    const weight = parseInt(document.getElementById("tdee-questionnaire-weight").value);
    const activityLevel = document.getElementById("tdee-questionnaire-activity-level").value;

    calculateTDEE(weight, feet, inches, age, gender, activityLevel); 
  });

};

mealPlanGenerator.addEventListener("click", function (event) {
  event.preventDefault();
  console.log(event.target);
  createTDEEQuestionnaire();
  }
);


