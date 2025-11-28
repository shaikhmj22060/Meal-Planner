import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

app.use(
  cors({
    origin: "https://meal-planner-client-uofu.onrender.com/",
    credentials: true,
  })
);

dotenv.config();
connectDB();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});
