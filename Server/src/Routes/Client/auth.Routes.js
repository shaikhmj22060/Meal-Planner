import { Router } from "express";
import { Login, Logout, register } from "../../Controllers/auth.controller.js";
import { getMe } from "../../Utils/getMe.js";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", Login);
authRoutes.get("/getMe", getMe);
authRoutes.post("/logout", Logout);
export default authRoutes;
