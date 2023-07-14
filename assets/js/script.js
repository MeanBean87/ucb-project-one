
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
