import { Router } from "express";
import { verifyToken } from "../middlewares/jwtAction";
import { MarkdownController } from "../controllers/markdown.controller";
import { validateMarkdownRequest } from "../middlewares/Psychologist/validateMarkdownRequest";

const router = Router();

router.get("/markdowns", verifyToken, MarkdownController.getAllMarkdowns);
router.get("/markdowns/:id", verifyToken, MarkdownController.getMarkdownById);
router.get("/markdowns/user/:user_id", verifyToken, MarkdownController.getMarkdownsByUserId);
router.post(
  "/markdowns",
  verifyToken,
  validateMarkdownRequest,
  MarkdownController.createMarkdown
);
router.put("/markdowns/:id", verifyToken,validateMarkdownRequest, MarkdownController.updateMarkdown);
router.delete("/markdowns/:id", verifyToken, MarkdownController.deleteMarkdown);

export default router;
