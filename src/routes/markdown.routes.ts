import { Router } from "express";
import { verifyToken } from "../middlewares/jwtAction";
import { MarkdownController } from "../controllers/markdown.controller";

const router = Router();

router.get("/markdowns", verifyToken, MarkdownController.getAllMarkdowns);
router.get("/markdowns/:id", verifyToken, MarkdownController.getMarkdownById);
router.post("/markdowns", verifyToken, MarkdownController.createMarkdown);
router.put("/markdowns/:id", verifyToken, MarkdownController.updateMarkdown);
router.delete("/markdowns/:id", verifyToken, MarkdownController.deleteMarkdown);

export default router;