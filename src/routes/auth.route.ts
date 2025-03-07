import { Router } from "express";
import { verifyToken } from "../middlewares/jwtAction";
import {
  createUserHandler,
  loginUserHandler,
  logoutController,
} from "../controllers/auth.controller";

const router = Router();
router.post("/auth/register", createUserHandler);
router.post("/auth/login", loginUserHandler);
router.post("/auth/logout", verifyToken, logoutController);

export default router;
