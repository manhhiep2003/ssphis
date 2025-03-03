import { Router } from "express";
import { verifyToken } from "../middlewares/jwtAction";
import { QuestionOptionController } from "../controllers/questionOption.controller";

const router = Router();
router.post("/question-option", verifyToken, QuestionOptionController.createQuestion);
router.get("/question-option", verifyToken, QuestionOptionController.getAllQuestionOptions);
router.get("/question-option/:id", verifyToken, QuestionOptionController.getQuestionOptionById);
router.put("/question-option/:id", verifyToken, QuestionOptionController.updateQuestionOption);
router.delete("/question-option/:id", verifyToken, QuestionOptionController.deleteQuestionOption);

export default router;
