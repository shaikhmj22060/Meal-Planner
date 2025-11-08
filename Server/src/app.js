import express from "express";
import router from "./Routes/index.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use((req, res, next) => {
//   console.log('Content-Type:', req.headers['content-type']);
//   console.log('req.body:', req.body);
//   next();
// });

app.use("/api", router);

export default app;
