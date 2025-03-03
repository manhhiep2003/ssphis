/* eslint-disable @typescript-eslint/no-explicit-any */
import HTTP_STATUS from "../constants/httpStatus";
import { Request, Response } from "express";
import { QUESTION_OPTION_MESSAGES } from "../constants/messages";
import { QuestionOptionService } from "../services/questionOption.service";

export class QuestionOptionController {
  static async createQuestion(req: Request, res: Response) {
    try {
      const { optionText, questionId, value } = req.body;
      const newQuestionOption = await QuestionOptionService.createQuestionOption({
        optionText,
        questionId: BigInt(questionId),
        value,
      });

      const sanitizedQuestionOption = {
        ...newQuestionOption,
        optionId: newQuestionOption.optionId.toString(),
        questionId: newQuestionOption.questionId.toString(),
      };

      res.status(HTTP_STATUS.CREATED).json({
        message: QUESTION_OPTION_MESSAGES.CREATE_SUCCESS,
        data: sanitizedQuestionOption,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: QUESTION_OPTION_MESSAGES.CREATE_FAILURE,
        error: error.message,
      });
    }
  }

  static async getQuestionOptionById(req: Request, res: Response) {
    try {
      const questionOption = await QuestionOptionService.getQuestionOptionById(
        Number(req.params.id),
      );
      if (questionOption) {
        res.status(HTTP_STATUS.OK).json({
          message: QUESTION_OPTION_MESSAGES.RETRIEVE_SINGLE_SUCCESS,
          data: questionOption,
        });
      } else {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: QUESTION_OPTION_MESSAGES.NOT_FOUND });
      }
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: QUESTION_OPTION_MESSAGES.RETRIEVE_SINGLE_FAILURE,
        error: error.message,
      });
    }
  }

  static async getAllQuestionOptions(req: Request, res: Response) {
    try {
      const surveys = await QuestionOptionService.getAllQuestionOptions();
      res.status(HTTP_STATUS.OK).json({
        message: QUESTION_OPTION_MESSAGES.RETRIEVE_SUCCESS,
        data: surveys,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: QUESTION_OPTION_MESSAGES.RETRIEVE_FAILURE,
        error: error.message,
      });
    }
  }

  static async updateQuestionOption(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { optionText, questionId, value } = req.body;
      const updatedSurvey = await QuestionOptionService.updateQuestionOption(Number(id), {
        optionText,
        questionId: questionId ? BigInt(questionId) : undefined,
        value,
      });

      res.status(HTTP_STATUS.OK).json({
        message: QUESTION_OPTION_MESSAGES.UPDATE_SUCCESS,
        data: updatedSurvey,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: QUESTION_OPTION_MESSAGES.UPDATE_FAILURE,
        error: error.message,
      });
    }
  }

  static async deleteQuestionOption(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await QuestionOptionService.deleteQuestionOption(Number(id));

      res.status(HTTP_STATUS.OK).json({
        message: QUESTION_OPTION_MESSAGES.DELETE_SUCCESS,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: QUESTION_OPTION_MESSAGES.DELETE_FAILURE,
        error: error.message,
      });
    }
  }
}
