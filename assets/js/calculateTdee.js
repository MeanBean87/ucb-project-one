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

const fetchExerciseObj = async (queryString) => {
  const apiKey = `KUNEX9M6Kwogj/J4y7Ru+A==FZ9J1FNl2AdRV6rw`;
  const url = `https://api.api-ninjas.com/v1/exercises?muscle=${queryString}`;

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

const fetchEdamamObj = (
  queryMealType,
  queryCalories,
  queryCarbs,
  queryProtein,
  queryFat
) => {
  let calories = queryCalories;
  let fat = queryFat;
  let carbohydrates = queryCarbs;
  let protein = queryProtein;
  let mealType = queryMealType;

  let url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=ea339611&app_key=40023aebe29c8284c820e11ded63b70f&mealType=${mealType}&calories=${calories}&nutrients%5BCHOCDF.net%5D=${carbohydrates}&nutrients%5BFAT%5D=${fat}&nutrients%5BPROCNT%5D=${protein}`;
  return fetch(url);
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

  const breakfastCalories = Math.round(tdee * 0.25);
  const lunchCalories = Math.round(tdee * 0.35);
  const dinnerCalories = Math.round(tdee * 0.3);
  const snacksCalories = Math.round(tdee * 0.1);

  const meals = {
    breakfast: {
      carbohydrates: Math.round(gramsOfCarbohydrates * 0.25),
      protein: Math.round(gramsOfProtein * 0.25),
      fat: Math.round(gramsOfFat * 0.25),
      calories: breakfastCalories,
    },
    lunch: {
      carbohydrates: Math.round(gramsOfCarbohydrates * 0.35),
      protein: Math.round(gramsOfProtein * 0.35),
      fat: Math.round(gramsOfFat * 0.35),
      calories: lunchCalories,
    },
    dinner: {
      carbohydrates: Math.round(gramsOfCarbohydrates * 0.3),
      protein: Math.round(gramsOfProtein * 0.3),
      fat: Math.round(gramsOfFat * 0.3),
      calories: dinnerCalories,
    },
    snacks: {
      carbohydrates: Math.round(gramsOfCarbohydrates * 0.1),
      protein: Math.round(gramsOfProtein * 0.1),
      fat: Math.round(gramsOfFat * 0.1),
      calories: snacksCalories,
    },
  };

  return meals;
};

const getFood = async (totalIntakeObj) => {
  let breakfastObj;
  let lunchObj;
  let dinnerObj;
  let snacksObj;

  try {
    const [breakfastRes, lunchRes, dinnerRes, snacksRes] = await Promise.all([
      fetchEdamamObj(
        "Breakfast",
        totalIntakeObj.breakfast.calories,
        totalIntakeObj.breakfast.carbohydrates,
        totalIntakeObj.breakfast.protein,
        totalIntakeObj.breakfast.fat
      ),
      fetchEdamamObj(
        "Lunch",
        totalIntakeObj.lunch.calories,
        totalIntakeObj.lunch.carbohydrates,
        totalIntakeObj.lunch.protein,
        totalIntakeObj.lunch.fat
      ),
      fetchEdamamObj(
        "Dinner",
        totalIntakeObj.dinner.calories,
        totalIntakeObj.dinner.carbohydrates,
        totalIntakeObj.dinner.protein,
        totalIntakeObj.dinner.fat
      ),
      fetchEdamamObj(
        "Snack",
        totalIntakeObj.snacks.calories,
        totalIntakeObj.snacks.carbohydrates,
        totalIntakeObj.snacks.protein,
        totalIntakeObj.snacks.fat
      ),
    ]);

    breakfastObj = await breakfastRes.json();
    lunchObj = await lunchRes.json();
    dinnerObj = await dinnerRes.json();
    snacksObj = await snacksRes.json();
  } catch (error) {
    console.error("An error occurred during getFood:", error);
  }
  console.log(breakfastObj);
  console.log(lunchObj);
  console.log(dinnerObj);
  console.log(snacksObj);
  return { breakfastObj, lunchObj, dinnerObj, snacksObj };
};

export {
  calculateTDEE,
  calculateMacroNutrients,
  divideMeals,
  goalOptions,
  activityLevel,
  getFood,
  fetchExerciseObj,
};
