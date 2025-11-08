import { Router } from "express";
import { create_admin } from "../../Controllers/admin/admin-auth.controller.js";
import { Login } from "../../Controllers/auth.controller.js";

const authAdmin = Router();

authAdmin.post("/register", create_admin);
authAdmin.post("/login", Login);
export default authAdmin;
