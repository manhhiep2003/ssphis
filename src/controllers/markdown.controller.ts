/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import HTTP_STATUS from "../constants/httpStatus";
import { MARKDOWN_MESSAGES } from "../constants/messages";
import { MarkdownService } from "../services/markdown.service";

export class MarkdownController {
  static async getAllMarkdowns(req: Request, res: Response) {
    try {
      const markdowns = await MarkdownService.getAllMarkdowns();
      res.status(HTTP_STATUS.OK).json({
        message: MARKDOWN_MESSAGES.RETRIEVE_SUCCESS,
        data: markdowns,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: MARKDOWN_MESSAGES.RETRIEVE_FAILURE,
        error: error.message,
      });
    }
  }

  static async getMarkdownById(req: Request, res: Response) {
    try {
      const markdown = await MarkdownService.getMarkdownById(
        Number(req.params.id)
      );
      if (markdown) {
        res.status(HTTP_STATUS.OK).json({
          message: MARKDOWN_MESSAGES.RETRIEVE_SINGLE_SUCCESS,
          data: markdown,
        });
      } else {
        res.status(HTTP_STATUS.NOT_FOUND).json({
          message: MARKDOWN_MESSAGES.NOT_FOUND,
        });
      }
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: MARKDOWN_MESSAGES.RETRIEVE_SINGLE_FAILURE,
        error: error.message,
      });
    }
  }

  static async getMarkdownsByUserId(req: Request, res: Response) {
    try {
      const markdowns = await MarkdownService.getMarkdownsByUserId(
        Number(req.params.user_id)
      );
      res.status(HTTP_STATUS.OK).json({
        message: MARKDOWN_MESSAGES.RETRIEVE_SUCCESS,
        data: markdowns,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: MARKDOWN_MESSAGES.RETRIEVE_FAILURE,
        error: error.message,
      });
    }
  }

  static async createMarkdown(req: Request, res: Response) {
    try {
      const markdown = await MarkdownService.createMarkdown(req.body);
      res.status(HTTP_STATUS.CREATED).json({
        message: MARKDOWN_MESSAGES.CREATE_SUCCESS,
        data: markdown,
      });
    } catch (error: any) {
      if (error.message.includes("Foreign key constraint failed")) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          message: MARKDOWN_MESSAGES.CREATE_FAILURE,
          error: "Invalid user_id or category_id",
        });
      } else {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          message: MARKDOWN_MESSAGES.CREATE_FAILURE,
          error: error.message,
        });
      }
    }
  }

  static async updateMarkdown(req: Request, res: Response) {
    try {
      const markdown = await MarkdownService.updateMarkdown(
        Number(req.params.id),
        req.body
      );
      res.status(HTTP_STATUS.OK).json({
        message: MARKDOWN_MESSAGES.UPDATE_SUCCESS,
        data: markdown,
      });
    } catch (error: any) {
      if (error.message.includes("Foreign key constraint failed")) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          message: MARKDOWN_MESSAGES.UPDATE_FAILURE,
          error: "Invalid category_id",
        });
      } else {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          message: MARKDOWN_MESSAGES.UPDATE_FAILURE,
          error: error.message,
        });
      }
    }
  }

  static async deleteMarkdown(req: Request, res: Response) {
    try {
      await MarkdownService.deleteMarkdown(Number(req.params.id));
      res.status(HTTP_STATUS.NO_CONTENT).json({
        message: MARKDOWN_MESSAGES.DELETE_SUCCESS,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: MARKDOWN_MESSAGES.DELETE_FAILURE,
        error: error.message,
      });
    }
  }
}
