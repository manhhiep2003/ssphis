import { Router } from "express";
import { RoleController } from "../controllers/role.controller";
import { validateRoleRequest } from "../middlewares/validateRoleRequest";
import { verifyToken } from "../middlewares/jwtAction";

const router = Router();
router.get("/roles", verifyToken, RoleController.getAllRoles);
router.get("/roles/:id", verifyToken, RoleController.getRoleById);
router.post(
  "/roles",
  verifyToken,
  validateRoleRequest,
  RoleController.createRole
);
router.put("/roles/:id", verifyToken, RoleController.updateRole);
router.delete("/roles/:id", verifyToken, RoleController.deleteRole);

export default router;
