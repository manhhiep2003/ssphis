/* eslint-disable @typescript-eslint/no-explicit-any */
import HTTP_STATUS from "../constants/httpStatus";
import { Request, Response } from "express";
import { SURVEY_RESULT_MESSAGES } from "../constants/messages";
import { SurveyResultService } from "../services/surveyResult.service";

export class SurveyResultController {
  static async createQuestion(req: Request, res: Response) {
    try {
      const { userId, surveyId } = req.body;
      const newSurveyResult = await SurveyResultService.createSurveyResult({
        userId: BigInt(userId),
        surveyId: BigInt(surveyId),
      });

      const sanitizedSurveyResult = {
        ...newSurveyResult,
        surveyResultId: newSurveyResult.surveyResultId.toString(),
        userId: newSurveyResult.userId.toString(),
        surveyId: newSurveyResult.surveyId.toString(),
      };

      res.status(HTTP_STATUS.CREATED).json({
        message: SURVEY_RESULT_MESSAGES.CREATE_SUCCESS,
        data: sanitizedSurveyResult,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: SURVEY_RESULT_MESSAGES.CREATE_FAILURE,
        error: error.message,
      });
    }
  }

  static async getSurveyResultById(req: Request, res: Response) {
    try {
      const surveyResult = await SurveyResultService.getSurveyResultById(
        Number(req.params.id)
      );
      if (surveyResult) {
        res.status(HTTP_STATUS.OK).json({
          message: SURVEY_RESULT_MESSAGES.RETRIEVE_SINGLE_SUCCESS,
          data: surveyResult,
        });
      } else {
        res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ message: SURVEY_RESULT_MESSAGES.NOT_FOUND });
      }
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: SURVEY_RESULT_MESSAGES.RETRIEVE_SINGLE_FAILURE,
        error: error.message,
      });
    }
  }

  static async getAllSurveyResult(req: Request, res: Response) {
    try {
      const surveyResult = await SurveyResultService.getAllSurveyResults();
      res.status(HTTP_STATUS.OK).json({
        message: SURVEY_RESULT_MESSAGES.RETRIEVE_SUCCESS,
        data: surveyResult,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: SURVEY_RESULT_MESSAGES.RETRIEVE_FAILURE,
        error: error.message,
      });
    }
  }

  static async updateSurveyResult(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { userId, surveyId } = req.body;
      const updatedSurvey = await SurveyResultService.updateSurveyResult(
        Number(id),
        {
          userId: userId ? BigInt(userId) : undefined,
          surveyId: surveyId ? BigInt(surveyId) : undefined,
        }
      );

      res.status(HTTP_STATUS.OK).json({
        message: SURVEY_RESULT_MESSAGES.UPDATE_SUCCESS,
        data: updatedSurvey,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: SURVEY_RESULT_MESSAGES.UPDATE_FAILURE,
        error: error.message,
      });
    }
  }

  static async deleteSurveyResult(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await SurveyResultService.deleteSurveyResult(Number(id));

      res.status(HTTP_STATUS.OK).json({
        message: SURVEY_RESULT_MESSAGES.DELETE_SUCCESS,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: SURVEY_RESULT_MESSAGES.DELETE_FAILURE,
        error: error.message,
      });
    }
  }
}
