/* eslint-disable @typescript-eslint/no-explicit-any */
import HTTP_STATUS from "../constants/httpStatus";
import { Request, Response } from "express";
import { ProgramService } from "../services/program.service";
import { PROGRAM_MESSAGES } from "../constants/messages";

export class ProgramController {
  static async createProgram(req: Request, res: Response) {
    try {
      const {
        title,
        description,
        categoryId,
        startDate,
        endDate,
        targetAudience,
        location,
        organizerEmail,
        contactPhone,
        imageUrl,
        price,
        rating,
      } = req.body;
      const newProgram = await ProgramService.createProgram({
        title,
        description,
        startDate,
        endDate,
        targetAudience,
        location,
        organizerEmail,
        contactPhone,
        imageUrl,
        price,
        rating,
        categoryId: BigInt(categoryId),
      });

      const sanitizedProgram = {
        ...newProgram,
        programId: newProgram.programId.toString(),
        categoryId: newProgram.categoryId.toString(),
      };

      res.status(HTTP_STATUS.CREATED).json({
        message: PROGRAM_MESSAGES.CREATE_SUCCESS,
        data: sanitizedProgram,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: PROGRAM_MESSAGES.CREATE_FAILURE,
        error: error.message,
      });
    }
  }

  static async getProgramById(req: Request, res: Response) {
    try {
      const program = await ProgramService.getProgramById(
        Number(req.params.id)
      );
      if (program) {
        res.status(HTTP_STATUS.OK).json({
          message: PROGRAM_MESSAGES.RETRIEVE_SINGLE_SUCCESS,
          data: program,
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

  static async getAllPrograms(req: Request, res: Response) {
    try {
      const programs = await ProgramService.getAllPrograms();
      res.status(HTTP_STATUS.OK).json({
        message: PROGRAM_MESSAGES.RETRIEVE_SUCCESS,
        data: programs,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: PROGRAM_MESSAGES.RETRIEVE_FAILURE,
        error: error.message,
      });
    }
  }

  static async updateProgram(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description, categoryId } = req.body;
      const updatedProgram = await ProgramService.updateProgram(Number(id), {
        title,
        description,
        categoryId: categoryId ? BigInt(categoryId) : undefined,
      });

      res.status(HTTP_STATUS.OK).json({
        message: PROGRAM_MESSAGES.UPDATE_SUCCESS,
        data: updatedProgram,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: PROGRAM_MESSAGES.UPDATE_FAILURE,
        error: error.message,
      });
    }
  }

  static async deleteProgram(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await ProgramService.deleteProgram(Number(id));

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
