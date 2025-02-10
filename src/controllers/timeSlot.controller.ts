/* eslint-disable @typescript-eslint/no-explicit-any */
import HTTP_STATUS from "../constants/httpStatus";
import { TIMESLOT_MESSAGES } from "../constants/messages";
import { TimeSlotService } from "../services/timeSlot.service";
import { NextFunction, Request, Response } from "express";
export class TimeSlotController {
  static async getAllTimeSlots(req: Request, res: Response) {
    try {
      const timeSlots = await TimeSlotService.getAllTimeSlots();
      res
        .status(HTTP_STATUS.OK)
        .json({ message: TIMESLOT_MESSAGES.RETRIEVE_SUCCESS, data: timeSlots });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: TIMESLOT_MESSAGES.RETRIEVE_FAILURE,
        error: error.message,
      });
    }
  }
  static async getTimeSlotById(req: Request, res: Response) {
    try {
      const role = await TimeSlotService.getTimeSlotyId(Number(req.params.id));
      if (role) {
        res.status(HTTP_STATUS.OK).json({
          message: TIMESLOT_MESSAGES.RETRIEVE_SINGLE_SUCCESS,
          data: role,
        });
      } else {
        res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ message: TIMESLOT_MESSAGES.NOT_FOUND });
      }
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: TIMESLOT_MESSAGES.RETRIEVE_SINGLE_FAILURE,
        error: error.message,
      });
    }
  }

  static async getTimeSlotByUserId(req: Request, res: Response): Promise<void> {
    try {
      const user_id = Number(req.query.user_id); // Get user_id from query parameters
      console.log("User ID:", user_id);
      
      const timeSlots = await TimeSlotService.getTimeSlotByUserId(user_id);
      if (timeSlots.length > 0) {
        res.status(HTTP_STATUS.OK).json({
          message: TIMESLOT_MESSAGES.RETRIEVE_SUCCESS,
          data: timeSlots,
        });
      } else {
        res.status(HTTP_STATUS.NOT_FOUND).json({
          message: TIMESLOT_MESSAGES.NOT_FOUND,
        });
      }
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: TIMESLOT_MESSAGES.RETRIEVE_FAILURE,
        error: error.message,
      });
    }
  }

  static async createTimeSlots(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { user_id, slots } = req.body;
      const timeSlots = await TimeSlotService.createTimeSlots(user_id, slots);
      res.status(HTTP_STATUS.CREATED).json({
        message: TIMESLOT_MESSAGES.CREATE_SUCCESS,
        data: timeSlots.slots,
      });
    } catch (error: any) {
      next(error);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: TIMESLOT_MESSAGES.CREATE_FAILURE,
        error: error.message,
      });
    }
  }

  static async updateTimeSlot(req: Request, res: Response) {
    try {
      const time_slot_id = Number(req.params.id);
      const { start_time, end_time, status } = req.body;
      const updatedSlot = await TimeSlotService.updateTimeSlot(time_slot_id, {
        start_time,
        end_time,
        status,
      });
      console.log("Updated slot:", updatedSlot);

      // ✅ Convert BigInt to String
      const formattedSlot = {
        ...updatedSlot,
        time_slot_id: updatedSlot.time_slot_id.toString(), // Fix BigInt issue
      };
      res.status(HTTP_STATUS.OK).json({
        message: TIMESLOT_MESSAGES.UPDATE_SUCCESS,
        data: formattedSlot,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: TIMESLOT_MESSAGES.UPDATE_FAILURE,
        error: error.message,
      });
    }
  }

  static async deleteTimeSlot(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await TimeSlotService.deleteTimeSlot(Number(id));
      res.status(HTTP_STATUS.OK).json({
        message: TIMESLOT_MESSAGES.DELETE_SUCCESS,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: TIMESLOT_MESSAGES.DELETE_FAILURE,
        error: error.message,
      });
    }
  }
}
