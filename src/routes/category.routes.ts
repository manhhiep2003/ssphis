import { Router } from "express";
import { verifyToken } from "../middlewares/jwtAction";
import { CategoryController } from "../controllers/category.controller";

const router = Router();
router.get("/category", verifyToken, CategoryController.getAllCategories);
router.get("/category/:id", verifyToken, CategoryController.getCategoryById);
router.post("/category", verifyToken, CategoryController.createCategory);
router.put("/category/:id", verifyToken, CategoryController.updateCategory);
router.delete("/category/:id", verifyToken, CategoryController.deleteCategory);

export default router;
