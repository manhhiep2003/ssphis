/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";

import HTTP_STATUS from "../constants/httpStatus";
import { APPOINTMENTS_MESSAGES } from "../constants/messages";
import { AppointmentsService } from "../services/appointments.service";

export class AppointmentsController {
  static async getAllAppointments(req: Request, res: Response) {
    try {
      const appointments = await AppointmentsService.getAllAppointments();
      res.status(HTTP_STATUS.OK).json({
        message: APPOINTMENTS_MESSAGES.RETRIEVE_SUCCESS,
        data: appointments,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: APPOINTMENTS_MESSAGES.RETRIEVE_FAILURE,
        error: error.message,
      });
    }
  }

  static async getAppointmentsById(req: Request, res: Response) {
    try {
      const appointment = await AppointmentsService.getAppointmentsById(
        Number(req.params.id)
      );
      if (appointment) {
        res.status(HTTP_STATUS.OK).json({
          message: APPOINTMENTS_MESSAGES.RETRIEVE_SINGLE_SUCCESS,
          data: appointment,
        });
      } else {
        res.status(HTTP_STATUS.NOT_FOUND).json({
          message: APPOINTMENTS_MESSAGES.NOT_FOUND,
        });
      }
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: APPOINTMENTS_MESSAGES.RETRIEVE_SINGLE_FAILURE,
        error: error.message,
      });
    }
  }

  static async getAppointmentsByUserId(req: Request, res: Response) {
    try {
      const user_id = Number(req.query.user_id);
      const appointments = await AppointmentsService.getAppointmentsByUserId(
        user_id
      );
      if (appointments.length > 0) {
        res.status(HTTP_STATUS.OK).json({
          message: APPOINTMENTS_MESSAGES.RETRIEVE_SUCCESS,
          data: appointments,
        });
      } else {
        res.status(HTTP_STATUS.NOT_FOUND).json({
          message: APPOINTMENTS_MESSAGES.NOT_FOUND,
        });
      }
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: APPOINTMENTS_MESSAGES.RETRIEVE_FAILURE,
        error: error.message,
      });
    }
  }

  static async createAppointments(req: Request, res: Response) {
    try {
      const { user_id, time_slot_id, date, status } = req.body;
      const appointment = await AppointmentsService.createAppointments(
        user_id,
        time_slot_id,
        date,
        status
      );
      res.status(HTTP_STATUS.CREATED).json({
        message: APPOINTMENTS_MESSAGES.CREATE_SUCCESS,
        data: appointment,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: APPOINTMENTS_MESSAGES.CREATE_FAILURE,
        error: error.message,
      });
    }
  }

  static async updateAppointments(req: Request, res: Response) {
    try {
      const appointment_id = Number(req.params.id);
      const { date, status } = req.body;
      const updatedAppointment = await AppointmentsService.updateAppointments(
        appointment_id,
        { date, status }
      );
      res.status(HTTP_STATUS.OK).json({
        message: APPOINTMENTS_MESSAGES.UPDATE_SUCCESS,
        data: updatedAppointment,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: APPOINTMENTS_MESSAGES.UPDATE_FAILURE,
        error: error.message,
      });
    }
  }

  static async deleteAppointments(req: Request, res: Response) {
    try {
      const appointment_id = Number(req.params.id);
      await AppointmentsService.deleteAppointments(appointment_id);
      res.status(HTTP_STATUS.OK).json({
        message: APPOINTMENTS_MESSAGES.DELETE_SUCCESS,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: APPOINTMENTS_MESSAGES.DELETE_FAILURE,
        error: error.message,
      });
    }
  }
}
