import axios from "axios";

const url = import.meta.env.VITE_SERVER;
export const generate = async (mealName, serving, note) => {
  try {
    const res = await axios.post(
      `${url}/api/crud/create-meal`,
      {
        mealName,
        serving,
        note,
      },
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
    console.log(err?.res?.msg);
  }
};

export const fetchMeals = async () => {
  try {
    const res = await axios.post(
      `${url}/api/crud/get-meal`,
      {},
      {
        withCredentials: true,
      }
    );

    return res.data.meals; // return meals array
  } catch (error) {
    console.error("Error fetching meals:", error);
  }
};
export const getRecipeByMealId = async (mealId) => {
  try {
    const res = await axios.get(
      `${url}/api/crud/recipe/${mealId}`,
      { withCredentials: true }
    );
    return res.data.recipe; // return ONLY the recipe
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
};
