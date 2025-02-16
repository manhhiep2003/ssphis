import { Router } from "express";
import { verifyToken } from "../middlewares/jwtAction";
import { SurveyController } from "../controllers/survey.controller";

const router = Router();
router.post("/survey", verifyToken, SurveyController.createSurvey);
router.get("/survey", verifyToken, SurveyController.getAllSurveys);
router.get("/survey/:id", verifyToken, SurveyController.getSurveyById);
router.put("/survey/:id", verifyToken, SurveyController.updateSurvey);
router.delete("/survey/:id", verifyToken, SurveyController.deleteSurvey);

export default router;
