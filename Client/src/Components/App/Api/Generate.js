import axios from "axios";

const generate = async (mealName, serving, note) => {
  const url = import.meta.env.VITE_SERVER;
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
     console.log(res.data.meal);
     return res.data
  } catch (err) {
    console.log(err);
    console.log(err?.res?.msg);
  }
};
export default generate;
