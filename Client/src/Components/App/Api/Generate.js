import axios from "axios";

const generate = async (mealName, serving, note) => {
  try {
    const res = await axios.post(
      "/api/crud/create-meal",
      {
        mealName,
        serving,
        note,
      },
      {
        withCredentials: true,
      }
    );
    console.log(res.data.recipe);
  } catch (err) {
    console.log(err);
    console.log(err?.res?.msg);
  }
};
export default generate;
