/* eslint-disable @typescript-eslint/no-explicit-any */
import HTTP_STATUS from "../constants/httpStatus";
import { SURVEY_MESSAGES } from "../constants/messages";
import { SurveyService } from "../services/survey.service";
import { Request, Response } from "express";

export class SurveyController {
  static async createSurvey(req: Request, res: Response) {
    try {
      const { title, description, categoryId, questions } = req.body;
      const newSurvey = await SurveyService.createSurvey({
        title,
        description,
        categoryId: BigInt(categoryId),
        questions,
      });

      res.status(HTTP_STATUS.CREATED).json({
        message: SURVEY_MESSAGES.CREATE_SUCCESS,
        data: newSurvey,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: SURVEY_MESSAGES.CREATE_FAILURE,
        error: error.message,
      });
    }
  }

  static async getSurveyQuestions(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const questions = await SurveyService.getSurveyQuestions(BigInt(id));

      if (questions.length > 0) {
        res.status(HTTP_STATUS.OK).json({
          message: SURVEY_MESSAGES.RETRIEVE_SUCCESS,
          data: questions,
        });
      } else {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: SURVEY_MESSAGES.NOT_FOUND });
      }
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: SURVEY_MESSAGES.RETRIEVE_FAILURE,
        error: error.message,
      });
    }
  }

  static async getAllSurveys(req: Request, res: Response) {
    try {
      const surveys = await SurveyService.getAllSurveys();
      res.status(HTTP_STATUS.OK).json({
        message: SURVEY_MESSAGES.RETRIEVE_SUCCESS,
        data: surveys,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: SURVEY_MESSAGES.RETRIEVE_FAILURE,
        error: error.message,
      });
    }
  }

  static async getSurveyDetail(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const survey = await SurveyService.getSurveyDetail(BigInt(id));

      if (!survey) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
          message: SURVEY_MESSAGES.NOT_FOUND,
        });
      }

      res.status(HTTP_STATUS.OK).json({
        message: SURVEY_MESSAGES.RETRIEVE_SUCCESS,
        data: survey,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: SURVEY_MESSAGES.RETRIEVE_FAILURE,
        error: error.message,
      });
    }
  }

  static async updateSurvey(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description, categoryId } = req.body;
      const updatedSurvey = await SurveyService.updateSurvey(Number(id), {
        title,
        description,
        categoryId: categoryId ? BigInt(categoryId) : undefined,
      });

      res.status(HTTP_STATUS.OK).json({
        message: SURVEY_MESSAGES.UPDATE_SUCCESS,
        data: updatedSurvey,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: SURVEY_MESSAGES.UPDATE_FAILURE,
        error: error.message,
      });
    }
  }

  static async deleteSurvey(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await SurveyService.deleteSurvey(Number(id));

      res.status(HTTP_STATUS.OK).json({
        message: SURVEY_MESSAGES.DELETE_SUCCESS,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: SURVEY_MESSAGES.DELETE_FAILURE,
        error: error.message,
      });
    }
  }
}
