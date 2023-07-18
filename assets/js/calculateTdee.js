import { goalOptions, activityLevel } from "./constants.js";
// creating fetchEdamamObj function
const fetchEdamamObj = (
  // setting parameters for fetchEdamamObj function
  queryMealType,
  queryCalories,
  queryCarbs,
  queryProtein,
  queryFat
) => {
  // setting variables for fetchEdamamObj function
  let calories = queryCalories;
  let fat = queryFat;
  let carbohydrates = queryCarbs;
  let protein = queryProtein;
  let mealType = queryMealType;
// setting url for fetchEdamamObj function
  let url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=ea339611&app_key=40023aebe29c8284c820e11ded63b70f&mealType=${mealType}&calories=${calories}&nutrients%5BCHOCDF.net%5D=${carbohydrates}&nutrients%5BFAT%5D=${fat}&nutrients%5BPROCNT%5D=${protein}`;
  return fetch(url);
};
// creating convertImpHeightToBaseInches function
const convertImpHeightToBaseInches = (feet, inches) => {
  // returning feet * 12 + inches to turn feet and inches into inches
  return feet * 12 + inches;
};
// creating convertInchesToCentimeters function
const convertInchesToCentimeters = (inches) => {
  // returning inches * 2.54 to turn inches into centimeters
  return inches * 2.54;
};
// creating convertPoundsToKilograms function
const convertPoundsToKilograms = (pounds) => {
  // returning pounds * 0.45359237 to turn pounds into kilograms
  return pounds * 0.45359237;
};
// creating calculateFemaleBMR function because it is different from Male
const calculateFemaleBMR = (weight, height, age) => {
  // formula for female BMR from https://www.calculator.net/bmr-calculator.html
  return 655 + 9.6 * weight + 1.8 * height - 4.7 * age;
};
//creating male BMR function
const calculateMaleBMR = (weight, height, age) => {
  // formula for male bmr from https://www.calculator.net/bmr-calculator.html
  return 66 + 13.7 * weight + 5 * height - 6.8 * age;
};
// creating calculateTDEE function
const calculateTDEE = (
  // setting parameters for calculateTDEE function
  weight,
  feet,
  inches,
  age,
  gender,
  selectedActivityLevel
) => {
  // setting variables for calculateTDEE function and calling functions of convertImpHeightToBaseInches, convertInchesToCentimeters, convertPoundsToKilograms
  let convertedWeight = convertPoundsToKilograms(weight);
  let convertedHeight = convertInchesToCentimeters(
    // calling convertImpHeightToBaseInches function
    convertImpHeightToBaseInches(feet, inches)
  );
// if gender is female then return calculateFemaleBMR function and multiply by activityLevel which calculates TDEE
  if (gender === "Female") {
    return (
      calculateFemaleBMR(convertedWeight, convertedHeight, age) *
      activityLevel[selectedActivityLevel]
    );
  } else {
    // else return calculateMaleBMR function and multiply by activityLevel which calculates TDEE
    return (
      calculateMaleBMR(convertedWeight, convertedHeight, age) *
      activityLevel[selectedActivityLevel]
    );
  }
};
// creating calculateMacroNutrients function with parameters of tdee and goal to calculate macroNutrients
const calculateMacroNutrients = (tdee, goal) => {
  let carbohydrates;
  let protein;
  let fat;
  // if goal is lose weight then carbohydrates = 0.4, protein = 0.4, fat = 0.2
  if (goal === "Lose Weight") {
    carbohydrates = 0.4;
    protein = 0.4;
    fat = 0.2;
  // if goal is gain weight then carbohydrates = 0.5, protein = 0.3, fat = 0.2
  } else if (goal === "Gain Weight") {
    carbohydrates = 0.5;
    protein = 0.3;
    fat = 0.2;
  // if goal is build muscle then carbohydrates = 0.45, protein = 0.4, fat = 0.15
  } else if (goal === "Build Muscle") {
    carbohydrates = 0.45;
    protein = 0.4;
    fat = 0.15;
  //if goal is to maintain weight then carbohydrates = 0.45, protein = 0.3, fat = 0.25
  } else {
    carbohydrates = 0.45;
    protein = 0.3;
    fat = 0.25;
  }
// if tdee is greater than or equal to 2500 then carbohydrates += 0.05, fat -= 0.05, for health purposes based on https://www.healthline.com/nutrition/how-many-carbs-per-day-to-lose-weight
  if (tdee >= 2500) {
    carbohydrates += 0.05;
    fat -= 0.05;
  } else if (tdee <= 1500) {
    carbohydrates -= 0.05;
    fat += 0.05;
  }
// returning our optimized macroNutrients based on tdee and goal
  return { carbohydrates: carbohydrates, protein: protein, fat: fat };
};
// creating divideMeals function with parameters of tdee and macroNutrients to divide meals into breakfast, lunch, dinner, and snacks! yummy!
const divideMeals = (tdee, macroNutrients) => {
  // setting variables for divideMeals function
  const { carbohydrates, protein, fat } = macroNutrients;
// setting variables for divideMeals function by rounding tdee * carbohydrates, tdee * protein, tdee * fat to nearest whole number which gets us calories from carbohydrates, protein, and fat
  const caloriesFromCarbohydrates = Math.round(tdee * carbohydrates);
  const caloriesFromProtein = Math.round(tdee * protein);
  const caloriesFromFat = Math.round(tdee * fat);
// from the calories from carbohydrates, protein, and fat, we divide by 4 to get grams of carbohydrates and protein, and divide by 9 to get grams of fat
  const gramsOfCarbohydrates = Math.round(caloriesFromCarbohydrates / 4);
  const gramsOfProtein = Math.round(caloriesFromProtein / 4);
  const gramsOfFat = Math.round(caloriesFromFat / 9);
// from the grams, we multiply by 0.25, 0.35, 0.3, 0.1 to get calories for each meal
  const breakfastCalories = Math.round(tdee * 0.25);
  const lunchCalories = Math.round(tdee * 0.35);
  const dinnerCalories = Math.round(tdee * 0.3);
  const snacksCalories = Math.round(tdee * 0.1);

  // creating meals object with breakfast, lunch, dinner, and snacks
  const meals = {
    // breakfast object with calories, carbohydrates, protein, and fat set to .25 of grams of carbohydrates, protein, and fat
    breakfast: {
      carbohydrates: Math.round(gramsOfCarbohydrates * 0.25),
      protein: Math.round(gramsOfProtein * 0.25),
      fat: Math.round(gramsOfFat * 0.25),
      calories: breakfastCalories,
    },
    //same as breakfast but with .35
    lunch: {
      carbohydrates: Math.round(gramsOfCarbohydrates * 0.35),
      protein: Math.round(gramsOfProtein * 0.35),
      fat: Math.round(gramsOfFat * 0.35),
      calories: lunchCalories,
    },
    //same as breakfast but with .3
    dinner: {
      carbohydrates: Math.round(gramsOfCarbohydrates * 0.3),
      protein: Math.round(gramsOfProtein * 0.3),
      fat: Math.round(gramsOfFat * 0.3),
      calories: dinnerCalories,
    },
    // same as breakfast but with .1
    snacks: {
      carbohydrates: Math.round(gramsOfCarbohydrates * 0.1),
      protein: Math.round(gramsOfProtein * 0.1),
      fat: Math.round(gramsOfFat * 0.1),
      calories: snacksCalories,
    },
  };

  return meals;
};
// creating getFood function with parameter of totalIntakeObj which is the meals object from divideMeals function to get food from Edamam API
const getFood = async (totalIntakeObj) => {
  let breakfastObj;
  let lunchObj;
  let dinnerObj;
  let snacksObj;

  // we are fetching from Edamam API with parameters of mealType, calories, carbohydrates, protein, fat
  try {
    // we are using Promise.all to fetch all 4 meals at the same time
    const [breakfastRes, lunchRes, dinnerRes, snacksRes] = await Promise.all([
      // we are calling fetchEdamamObj function with parameters of mealType, calories, carbohydrates, protein, fat to get food from Edamam API for each meal
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
    // we are setting breakfastObj, lunchObj, dinnerObj, snacksObj to the json of each meal we fetched from Edamam API
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
  return {breakfastObj, lunchObj, dinnerObj, snacksObj };
};
// exporting calculateTDEE, calculateMacroNutrients, divideMeals, goalOptions, activityLevel, getFood
export {
  calculateTDEE,
  calculateMacroNutrients,
  divideMeals,
  goalOptions,
  activityLevel,
  getFood,
};
