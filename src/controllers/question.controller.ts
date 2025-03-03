/* eslint-disable @typescript-eslint/no-explicit-any */
import HTTP_STATUS from "../constants/httpStatus";
import { QUESTION_MESSAGES } from "../constants/messages";
import { Request, Response } from "express";
import { QuestionService } from "../services/question.service";

export class QuestionController {
  static async createQuestion(req: Request, res: Response) {
    try {
      const { questionText, surveyId } = req.body;
      const newQuestion = await QuestionService.createQuestion({
        questionText,
        surveyId: BigInt(surveyId),
      });

      const sanitizedQuestion = {
        ...newQuestion,
        questionId: newQuestion.questionId.toString(),
        surveyId: newQuestion.surveyId.toString(),
      };

      res.status(HTTP_STATUS.CREATED).json({
        message: QUESTION_MESSAGES.CREATE_SUCCESS,
        data: sanitizedQuestion,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: QUESTION_MESSAGES.CREATE_FAILURE,
        error: error.message,
      });
    }
  }

  static async getQuestionById(req: Request, res: Response) {
    try {
      const question = await QuestionService.getQuestionById(Number(req.params.id));
      if (question) {
        res.status(HTTP_STATUS.OK).json({
          message: QUESTION_MESSAGES.RETRIEVE_SINGLE_SUCCESS,
          data: question,
        });
      } else {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: QUESTION_MESSAGES.NOT_FOUND });
      }
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: QUESTION_MESSAGES.RETRIEVE_SINGLE_FAILURE,
        error: error.message,
      });
    }
  }

  static async getAllQuestions(req: Request, res: Response) {
    try {
      const surveys = await QuestionService.getAllQuestions();
      res.status(HTTP_STATUS.OK).json({
        message: QUESTION_MESSAGES.RETRIEVE_SUCCESS,
        data: surveys,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: QUESTION_MESSAGES.RETRIEVE_FAILURE,
        error: error.message,
      });
    }
  }

  static async updateQuestion(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { questionText, surveyId } = req.body;
      const updatedSurvey = await QuestionService.updateQuestion(Number(id), {
        questionText,
        surveyId: surveyId ? BigInt(surveyId) : undefined,
      });

      res.status(HTTP_STATUS.OK).json({
        message: QUESTION_MESSAGES.UPDATE_SUCCESS,
        data: updatedSurvey,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: QUESTION_MESSAGES.UPDATE_FAILURE,
        error: error.message,
      });
    }
  }

  static async deleteQuestion(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await QuestionService.deleteQuestion(Number(id));

      res.status(HTTP_STATUS.OK).json({
        message: QUESTION_MESSAGES.DELETE_SUCCESS,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: QUESTION_MESSAGES.DELETE_FAILURE,
        error: error.message,
      });
    }
  }
}
