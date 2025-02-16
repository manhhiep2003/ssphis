/* eslint-disable @typescript-eslint/no-explicit-any */
import HTTP_STATUS from "../constants/httpStatus";
import { PROGRAM_MESSAGES } from "../constants/messages";
import { SurveyService } from "../services/survey.service";
import { Request, Response } from "express";

export class SurveyController {
  static async createSurvey(req: Request, res: Response) {
    try {
      const { title, description, categoryId } = req.body;
      const newSurvey = await SurveyService.createSurvey({
        title,
        description,
        categoryId: BigInt(categoryId),
      });

      const sanitizedSurvey = {
        ...newSurvey,
        id: newSurvey.surveyId.toString(),
        categoryId: newSurvey.categoryId.toString(),
      };

      res.status(HTTP_STATUS.CREATED).json({
        message: PROGRAM_MESSAGES.CREATE_SUCCESS,
        data: sanitizedSurvey,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: PROGRAM_MESSAGES.CREATE_FAILURE,
        error: error.message,
      });
    }
  }

  static async getSurveyById(req: Request, res: Response) {
    try {
      const survey = await SurveyService.getSurveyById(Number(req.params.id));
      if (survey) {
        res.status(HTTP_STATUS.OK).json({
          message: PROGRAM_MESSAGES.RETRIEVE_SINGLE_SUCCESS,
          data: survey,
        });
      } else {
        res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ message: PROGRAM_MESSAGES.NOT_FOUND });
      }
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: PROGRAM_MESSAGES.RETRIEVE_SINGLE_FAILURE,
        error: error.message,
      });
    }
  }

  static async getAllSurveys(req: Request, res: Response) {
    try {
      const surveys = await SurveyService.getAllSurveys();
      res.status(HTTP_STATUS.OK).json({
        message: PROGRAM_MESSAGES.RETRIEVE_SUCCESS,
        data: surveys,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: PROGRAM_MESSAGES.RETRIEVE_FAILURE,
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
        message: PROGRAM_MESSAGES.UPDATE_SUCCESS,
        data: updatedSurvey,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: PROGRAM_MESSAGES.UPDATE_FAILURE,
        error: error.message,
      });
    }
  }

  static async deleteSurvey(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await SurveyService.deleteSurvey(Number(id));

      res.status(HTTP_STATUS.OK).json({
        message: PROGRAM_MESSAGES.DELETE_SUCCESS,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: PROGRAM_MESSAGES.DELETE_FAILURE,
        error: error.message,
      });
    }
  }
}
