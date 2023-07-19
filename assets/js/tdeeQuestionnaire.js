import {
  activityLevel,
  goalOptions,
  mainContainer,
  mealOptions,
} from "./constants.js";
import { startFunction } from "./script.js";
import { validateData } from "./inputValidation.js";

const createTDEEQuestionnaire = () => {
  //Create Form
  const tdeeQuestionnaire = document.createElement("form");
  tdeeQuestionnaire.setAttribute("id", "tdee-questionnaire");
  tdeeQuestionnaire.setAttribute(
    "class",
    "tdee-questionnaire flex rounded-lg p-5 m-5 bg-lime-100 text-black"
  );
  tdeeQuestionnaire.setAttribute(
    "style",
    "display: flex; flex-direction: column; align-items: center;"
  );
  mainContainer.appendChild(tdeeQuestionnaire);

  //Form Title
  const tdeeQuestionnaireTitle = document.createElement("h2");
  tdeeQuestionnaireTitle.setAttribute("id", "tdee-questionnaire-title");
  tdeeQuestionnaireTitle.setAttribute(
    "class",
    "tdee-questionnaire-title  font-bold pt-5 text-xl"
  );
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
    "tdee-questionnaire-description font-bold mx-5 pt-5 text-center"
  );
  tdeeQuestionnaireDescription.textContent =
    "Please answer the following questions to calculate your TDEE:";
  tdeeQuestionnaire.appendChild(tdeeQuestionnaireDescription);

  const tdeeFormErrors = document.createElement("div");
  tdeeFormErrors.setAttribute("id", "tdee-form-errors");
  tdeeFormErrors.setAttribute("class", "flex flex-col text-center");
  tdeeQuestionnaire.appendChild(tdeeFormErrors);

  //Form Name Input Label
  const tdeeQuestionnaireName = document.createElement("label");
  tdeeQuestionnaireName.setAttribute("for", "tdee-questionnaire-name");
  tdeeQuestionnaireName.setAttribute("id", "tdee-questionnaire-name-label");
  tdeeQuestionnaireName.setAttribute(
    "class",
    "tdee-questionnaire-name-label font-bold pb-1 pt-5"
  );
  tdeeQuestionnaireName.textContent = "Name: ";
  tdeeQuestionnaire.appendChild(tdeeQuestionnaireName);

  //Form Name Input
  const tdeeQuestionnaireNameInput = document.createElement("input");
  tdeeQuestionnaireNameInput.setAttribute("type", "text");
  tdeeQuestionnaireNameInput.setAttribute("id", "tdee-questionnaire-name");
  tdeeQuestionnaireNameInput.setAttribute(
    "class",
    "tdee-questionnaire-name placeholder-grey text-center rounded border-2 border-black"
  );
  tdeeQuestionnaireNameInput.setAttribute("name", "tdee-questionnaire-name");
  tdeeQuestionnaireNameInput.setAttribute("placeholder", "Enter your name");
  tdeeQuestionnaire.appendChild(tdeeQuestionnaireNameInput);

  //Form Age Input Label
  const tdeeQuestionnaireAge = document.createElement("label");
  tdeeQuestionnaireAge.setAttribute("for", "tdee-questionnaire-age");
  tdeeQuestionnaireAge.setAttribute("id", "tdee-questionnaire-age-label");
  tdeeQuestionnaireAge.setAttribute(
    "class",
    "tdee-questionnaire-age-label font-bold border-black pb-1 pt-5"
  );
  tdeeQuestionnaireAge.textContent = "Age: ";
  tdeeQuestionnaire.appendChild(tdeeQuestionnaireAge);

  //Form Age Input
  const tdeeQuestionnaireAgeInput = document.createElement("input");
  tdeeQuestionnaireAgeInput.setAttribute("type", "number");
  tdeeQuestionnaireAgeInput.setAttribute("id", "tdee-questionnaire-age");
  tdeeQuestionnaireAgeInput.setAttribute(
    "class",
    "tdee-questionnaire-age placeholder-grey text-center rounded border-2 border-black"
  );
  tdeeQuestionnaireAgeInput.setAttribute("placeholder", "Age");
  tdeeQuestionnaire.appendChild(tdeeQuestionnaireAgeInput);

  //Form Gender Input Label
  const tdeeQuestionnaireGender = document.createElement("label");
  tdeeQuestionnaireGender.setAttribute("for", "tdee-questionnaire-gender");
  tdeeQuestionnaireGender.setAttribute("id", "tdee-questionnaire-gender-label");
  tdeeQuestionnaireGender.setAttribute(
    "class",
    "tdee-questionnaire-gender-label font-bold pb-1 pt-5"
  );
  tdeeQuestionnaireGender.textContent = "Please select your gender: ";
  tdeeQuestionnaire.appendChild(tdeeQuestionnaireGender);

  //Form Gender Input
  const tdeeQuestionnaireGenderInput = document.createElement("select");
  tdeeQuestionnaireGenderInput.setAttribute("id", "tdee-questionnaire-gender");
  tdeeQuestionnaireGenderInput.setAttribute(
    "class",
    "tdee-questionnaire-gender text-center rounded border-2 border-black"
  );

  // Gender Options
  const defaultOption = document.createElement("option");
  defaultOption.setAttribute("class", "placeholder-grey")
  defaultOption.setAttribute("value", "");
  defaultOption.textContent = "Select Gender";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  tdeeQuestionnaireGenderInput.appendChild(defaultOption);

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
    "tdee-questionnaire-height pb-1 pt-5"
  );
  tdeeQuestionnaire.appendChild(tdeeQuestionnaireHeightInput);

  //Form Height Input Label
  const tdeeQuestionnaireHeightLabel = document.createElement("p");
  tdeeQuestionnaireHeightLabel.setAttribute(
    "id",
    "tdee-questionnaire-height-label"
  );
  tdeeQuestionnaireHeightLabel.setAttribute(
    "class",
    "tdee-questionnaire-height-label font-bold"
  );
  tdeeQuestionnaireHeightLabel.textContent = "Height: ";
  tdeeQuestionnaireHeightInput.appendChild(tdeeQuestionnaireHeightLabel);

  //Form Feet Input
  const tdeeQuestionnaireFeetInput = document.createElement("input");
  tdeeQuestionnaireFeetInput.setAttribute("type", "number");
  tdeeQuestionnaireFeetInput.setAttribute("id", "tdee-questionnaire-feet");
  tdeeQuestionnaireFeetInput.setAttribute(
    "class",
    "tdee-questionnaire-feet placeholder-grey my-1 text-center rounded border-2 border-black"
  );
  tdeeQuestionnaireFeetInput.setAttribute("placeholder", "Feet");
  tdeeQuestionnaireHeightInput.appendChild(tdeeQuestionnaireFeetInput);

  //Form Inches Input
  const tdeeQuestionnaireInchesInput = document.createElement("input");
  tdeeQuestionnaireInchesInput.setAttribute("type", "number");
  tdeeQuestionnaireInchesInput.setAttribute("id", "tdee-questionnaire-inches");
  tdeeQuestionnaireInchesInput.setAttribute(
    "class",
    "tdee-questionnaire-inches placeholder-grey text-center rounded border-2 border-black"
  );
  tdeeQuestionnaireInchesInput.setAttribute("placeholder", "Inches");
  tdeeQuestionnaireHeightInput.appendChild(tdeeQuestionnaireInchesInput);

  //Form Weight Input Label
  const tdeeQuestionnaireWeight = document.createElement("label");
  tdeeQuestionnaireWeight.setAttribute("for", "tdee-questionnaire-weight");
  tdeeQuestionnaireWeight.setAttribute("id", "tdee-questionnaire-weight-label");
  tdeeQuestionnaireWeight.setAttribute(
    "class",
    "tdee-questionnaire-weight-label  font-bold pb-1 pt-5"
  );
  tdeeQuestionnaireWeight.textContent = "Weight: ";
  tdeeQuestionnaire.appendChild(tdeeQuestionnaireWeight);

  //Form Weight Input
  const tdeeQuestionnaireWeightInput = document.createElement("input");
  tdeeQuestionnaireWeightInput.setAttribute("type", "number");
  tdeeQuestionnaireWeightInput.setAttribute("id", "tdee-questionnaire-weight");
  tdeeQuestionnaireWeightInput.setAttribute(
    "class",
    "tdee-questionnaire-weight placeholder-grey text-center border-2 border-black rounded"
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
    "tdee-questionnaire-activity-level-label font-bold pb-1 pt-5"
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
    "tdee-questionnaire-activity-level text-center rounded border-2 border-black"
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
    "meal-questionnaire-calories-label  font-bold pb-1 pt-5"
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
    "meal-questionnaire-calories text-center rounded border-2 border-black"
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
  tdeeQuestionnaireSubmit.setAttribute(
    "class",
    "tdee-questionnaire-submit bg-lime-500 hover:bg-lime-700 font-bold py-1 px-1 m-2 rounded"
  );
  tdeeQuestionnaireSubmit.textContent = "Submit";
  tdeeQuestionnaire.appendChild(tdeeQuestionnaireSubmit);

  //Form Submit Event Listener
  tdeeQuestionnaire.addEventListener("submit", function (event) {
    event.preventDefault();
    const age = parseInt(
      document.getElementById("tdee-questionnaire-age").value
    );
    const feet = parseInt(
      document.getElementById("tdee-questionnaire-feet").value
    );
    const inches = parseInt(
      document.getElementById("tdee-questionnaire-inches").value
    );
    const weight = parseInt(
      document.getElementById("tdee-questionnaire-weight").value
    );

    const gender = document.getElementById("tdee-questionnaire-gender").value;

    const activityLevelEl = document.getElementById(
      "tdee-questionnaire-activity-level"
    ).value;

    const goal = document.getElementById("meal-questionnaire-calories").value;

    const name = document.getElementById("tdee-questionnaire-name").value;

    const checkData = validateData(name, age, gender, feet, inches, weight);

    if (checkData) {
      startFunction(
        weight,
        feet,
        inches,
        age,
        gender,
        activityLevelEl,
        goal,
        name
      )
        .then(() => {
          console.log("startFunction successfully completed");
        })
        .catch((error) => {
          console.error("An error occurred during startFunction:", error);
        });
    }
  });
};

export { createTDEEQuestionnaire };
