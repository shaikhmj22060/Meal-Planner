import axios from "axios";

const url = import.meta.env.VITE_SERVER;
const generate = async (mealName, serving, note) => {
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

const fetchMeals = async () => {
  try {
    const res = await axios.post(`${url}/api/crud/get-meal`, {
      withCredentials: true,
    });

    const data = await res.json();
    return data.meals; // return meals array
  } catch (error) {
    console.error("Error fetching meals:", error);
    return [];
  }
};
export default { generate, fetchMeals };
