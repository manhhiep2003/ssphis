/* eslint-disable @typescript-eslint/no-explicit-any */
import HTTP_STATUS from "../constants/httpStatus";
import { CATEGORY_MESSAGES } from "../constants/messages";
import { CategoryService } from "../services/category.service";
import { Request, Response } from "express";

export class CategoryController {
  static async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await CategoryService.getAllCategories();
      res.status(HTTP_STATUS.OK).json({
        message: CATEGORY_MESSAGES.RETRIEVE_SUCCESS,
        data: categories,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: CATEGORY_MESSAGES.RETRIEVE_FAILURE,
        error: error.message,
      });
    }
  }

  static async getCategoryById(req: Request, res: Response) {
    try {
      const category = await CategoryService.getCategoryById(
        Number(req.params.id)
      );
      if (category) {
        res.status(HTTP_STATUS.OK).json({
          message: CATEGORY_MESSAGES.RETRIEVE_SINGLE_SUCCESS,
          data: category,
        });
      } else {
        res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ message: CATEGORY_MESSAGES.NOT_FOUND });
      }
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: CATEGORY_MESSAGES.RETRIEVE_SINGLE_FAILURE,
        error: error.message,
      });
    }
  }

  static async createCategory(req: Request, res: Response) {
    try {
      const createdCategory = await CategoryService.createCategory(req.body);
      const responseData = {
        ...createdCategory,
        categoryId: createdCategory.categoryId.toString(),
      };
      res.status(HTTP_STATUS.CREATED).json({
        message: CATEGORY_MESSAGES.CREATE_SUCCESS,
        data: responseData,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: CATEGORY_MESSAGES.CREATE_FAILURE,
        error: error.message,
      });
    }
  }

  static async updateCategory(req: Request, res: Response) {
    try {
      const category = await CategoryService.updateCategory(
        Number(req.params.id),
        req.body
      );

      res.status(HTTP_STATUS.OK).json({
        message: CATEGORY_MESSAGES.UPDATE_SUCCESS,
        data: category,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: CATEGORY_MESSAGES.UPDATE_FAILURE,
        error: error.message,
      });
    }
  }

  static async deleteCategory(req: Request, res: Response) {
    try {
      await CategoryService.deleteCategory(Number(req.params.id));
      res
        .status(HTTP_STATUS.NO_CONTENT)
        .json({ message: CATEGORY_MESSAGES.DELETE_SUCCESS });
    } catch (error: any) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: CATEGORY_MESSAGES.DELETE_FAILURE, error: error.message });
    }
  }
}
