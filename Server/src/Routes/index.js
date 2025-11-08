import { Router } from "express";
import authRoutes from "./Client/auth.Routes.js";
import authAdmin from "./Admin/auth-admin.Routes.js";
import crud from "./Client/crud.routes.js";
import { protect } from "../middleware/protect.middleware.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/crud",protect,crud);
router.use("/authAdmin", authAdmin);
export default router;
