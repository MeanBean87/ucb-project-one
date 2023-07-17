import { fetchExerciseObj } from "./script.js";
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

  const workoutPlanDescription = document.createElement("p");
  workoutPlanDescription.setAttribute("id", "work-out-description");
  workoutPlanDescription.setAttribute(
    "class",
    "work-out-description text-white font-extrabold pb-5"
  );
  workoutPlanDescription.textContent =
    "Please select a workout type that you like!";
  workoutPlan.appendChild(workoutPlanDescription);

  //Form Workout Input
  const workoutPlanTypeInput = document.createElement("select");
  workoutPlanTypeInput.setAttribute("id", "workout-plan-type");
  workoutPlanTypeInput.setAttribute("class", "workout-plan-type");
  workoutPlan.appendChild(workoutPlanTypeInput);

  // WorkoutPlan Options
  const options = ["Strength", "Cardio", "Powerlifting"];
  for (const option of options) {
    const typeOption = document.createElement("option");
    typeOption.setAttribute("value", option);
    typeOption.textContent = option;
    workoutPlanTypeInput.appendChild(typeOption);
  }

  //Form Submit Button
  const workoutPlanSubmit = document.createElement("button");
  workoutPlanSubmit.setAttribute("type", "submit");
  workoutPlanSubmit.setAttribute("id", "workout-plan-submit");
  workoutPlanSubmit.setAttribute(
    "class",
    "workout-plan-submit text-white font-extrabold pb-5"
  );
  workoutPlanSubmit.textContent = "Submit";
  workoutPlan.appendChild(workoutPlanSubmit);
};


createWorkout();
// eventlistener submit to generate random workout form our workoutPlan Options
workoutPlanSubmit.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from submitting and refreshing the page
  fetchExerciseObj(event.target.value);
});
workoutPlanGenerator.addEventListener("click", function (event) {
  event.preventDefault();
  clearMainContainer();
  createWorkout();
});
