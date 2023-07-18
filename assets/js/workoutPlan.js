import { mainContainer } from "./constants.js";

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

const getExercises = async (exerciseType) => {
  try {
    const exerciseRes = await fetchExerciseObj(exerciseType);
    return exerciseRes.json();
  } catch (error) {
    console.error("An error occurred during getExercises:", error);
  }
};

const createExercisePlan = async (selectedExercise) => {
  const exerciseObj = await getExercises(selectedExercise);
  console.log(exerciseObj);

  exerciseObj.forEach((exercise) => {
    const exerciseItem = document.createElement("div");
    exerciseItem.classList.add(
      "exercise-item",
      "bg-gray-800",
      "p-4",
      "rounded-md",
      "m-6",
      "text-white",
      "text-center",
      "color"
    );

    for (const key in exercise) {
      const value = exercise[key];

      const exerciseCard = document.createElement("div");
      exerciseCard.classList.add(
        "exercise-card",
        "bg-gray-900",
        "p-4",
        "rounded-md",
        "mb-4"
      );

      const exerciseProperty = document.createElement("div");
      exerciseProperty.classList.add("exercise-property");

      const propertyName = document.createElement("span");
      propertyName.textContent = key + ": ";
      propertyName.classList.add("font-bold");
      exerciseProperty.appendChild(propertyName);

      const propertyValue = document.createElement("span");
      propertyValue.textContent = value;
      exerciseProperty.appendChild(propertyValue);

      exerciseCard.appendChild(exerciseProperty);
      exerciseItem.appendChild(exerciseCard);
    }

    mainContainer.appendChild(exerciseItem);
  });
};
export { createExercisePlan };