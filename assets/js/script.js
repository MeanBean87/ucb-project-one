
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

//TODO: create object to store activity level and multiplier.






















//====================================================================================================
//TODO: Convert feet and inches to base inches ie 6' 1' inches = 73.
const convertImpHeightToBaseInches = (feet, inches) => {
  return feet * 12 + inches;
}

const convertImpHeightToMetric = (inches) => {
  return inches * 2.54;
};














//====================================================================================================
// TODO: Function to calculate BMR for male.
const calculateBMRMale = (weight, height, age, sex) => {
  let 



 };




















//====================================================================================================
//TODO: Function to calculate BMR for female.




















//====================================================================================================
//TODO: Create function to convert imperial inches to metric centimeters.
























//====================================================================================================
//TODO: Create function to convert imperial pounds to metric kilograms.

