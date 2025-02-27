import { Router } from "express";
import {
  createUserHandler,
  loginUserHandler,
  getAllUsersHandler,
  getUsersByRoleHandler,
  updateUserProfileHandler,
  getUserByIdHandler,
  updateUserStatusHandler,
} from "../controllers/user.controller";
import { verifyToken } from "../middlewares/jwtAction";
import { authorizeRoles } from "../middlewares/authorization";

const router = Router();

router.post("/register", createUserHandler);
router.post("/login", loginUserHandler);
router.get("/users", verifyToken, getAllUsersHandler);
router.get("/users/:roleCode", verifyToken, getUsersByRoleHandler);
router.get("/public/users/:id", getUserByIdHandler);
router.put("/profile/:userCode", verifyToken, updateUserProfileHandler);
router.put(
  "/users/:id",
  verifyToken,
  authorizeRoles("R3", "R4"),
  updateUserStatusHandler
);

export default router;
