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

const mainContainer = document.getElementById("main-container");
  
export { activityLevel, goalOptions, mainContainer };