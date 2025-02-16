import { Router } from "express";
import { verifyToken } from "../middlewares/jwtAction";
import { QuestionController } from "../controllers/question.controller";

const router = Router();
router.post("/question", verifyToken, QuestionController.createQuestion);
router.get("/question", verifyToken, QuestionController.getAllQuestions);
router.get("/question/:id", verifyToken, QuestionController.getQuestionById);
router.put("/question/:id", verifyToken, QuestionController.updateQuestion);
router.delete("/question/:id", verifyToken, QuestionController.deleteQuestion);

export default router;
