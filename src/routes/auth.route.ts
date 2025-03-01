import { Router } from "express";
import { verifyToken } from "../middlewares/jwtAction";
import { logoutController } from "../controllers/auth.controller";

const router = Router();
router.post("/auth/logout", verifyToken, logoutController);

export default router;
