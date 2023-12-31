import { mainContainer } from "./constants.js";
// creating fetchExerciseObj function to fetch exercise data from api
const fetchExerciseObj = (queryString) => {
  const url = `https://api.api-ninjas.com/v1/exercises?type=${queryString}`;
  return fetch(url, {
    method: "GET",
    headers: {
      "X-Api-Key": "KUNEX9M6Kwogj/J4y7Ru+A==FZ9J1FNl2AdRV6rw",
      "Content-Type": "application/json",
    },
  });
};
// creating getExercises function
const getExercises = async (exerciseType) => {
  // try block to fetch exercise data from api depending on exerciseType
  try {
    const exerciseRes = await fetchExerciseObj(exerciseType);
    return exerciseRes.json();
  } catch (error) {
    console.error("An error occurred during getExercises:", error);
  }
};
// creating createExercisePlan function with parameter of selectedExercise
const createExercisePlan = async (selectedExercise) => {
  const exerciseObj = await getExercises(selectedExercise);
  console.log(exerciseObj);
  // styling forEach exerciseObj
  exerciseObj.forEach((exercise) => {
    const exerciseItem = document.createElement("div");
    exerciseItem.classList.add(
      "exercise-item",
      "bg-lime-300",
      "p-4",
      "rounded-md",
      "m-6",
      "text-white",
      "text-center",
      "border-2",
      "border-black"
    );
    //accessing each key and value in exerciseObj
    for (const key in exercise) {
      const value = exercise[key];

      const exerciseCard = document.createElement("div");
      exerciseCard.classList.add("exercise-card", "p-4",  "bg-gray-800", "text-white", "max-w-prose");

      const exerciseProperty = document.createElement("div");
      exerciseCard.classList.add("exercise-property");

      const propertyName = document.createElement("span");
      propertyName.textContent = key + ": ";
      propertyName.classList.add("font-bold");
      exerciseCard.appendChild(propertyName);

      const propertyValue = document.createElement("span");
      propertyValue.textContent = value;
      exerciseCard.appendChild(propertyValue);

      exerciseCard.appendChild(exerciseProperty);
      exerciseItem.appendChild(exerciseCard);
    }

    mainContainer.appendChild(exerciseItem);
  });
};
export { createExercisePlan };
