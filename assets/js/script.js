import { values as mealValues } from "./mealValues.js";

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

const activityLevel = {
  sedentary: 1.2, //(little to no exercise + work a desk job) = 1.2
  LightlyActive: 1.375, // (light exercise 1-3 days / week)
  ModeratelyActive: 1.55, //(moderate exercise 3-5 days / week
  VeryActive: 1.725, //(heavy exercise 5-7 days / week)
  ExtremelyActive: 1.9, //(very heavy exercise, hard labor job, training 2x / day)
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

const calculateTDEE = (weight, height, age, gender, activityLevel) => {
  let weight = convertPoundsToKilograms(weight);
  let height = convertInchesToCentimeters(convertImpHeightToBaseInches(height));

  if (gender === "Female") {
    return calculateFemaleBMR(weight, height, age) * activityLevel;
  } else {
    return calculateMaleBMR(weight, height, age) * activityLevel;
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


