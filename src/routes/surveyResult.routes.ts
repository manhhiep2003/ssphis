import { Router } from "express";
import { verifyToken } from "../middlewares/jwtAction";
import { SurveyResultController } from "../controllers/surveyResult.controller";

const router = Router();
router.post("/survey-result/submit", verifyToken, SurveyResultController.submitSurveyResult);
router.get("/survey-result", verifyToken, SurveyResultController.getAllSurveyResult);
router.get("/survey-result/:id", verifyToken, SurveyResultController.getSurveyResultById);
router.put("/survey-result/:id", verifyToken, SurveyResultController.updateSurveyResult);
router.delete("/survey-result/:id", verifyToken, SurveyResultController.deleteSurveyResult);

export default router;
