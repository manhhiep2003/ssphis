/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";

import HTTP_STATUS from "../constants/httpStatus";
import { APPOINTMENTS_MESSAGES } from "../constants/messages";
import {
  AppointmentsService,
  AppointmentStatus,
} from "../services/appointments.service";

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

  static async getAppointmentsByUserId(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const user_id = Number(req.query.user_id);
      const student_id = req.query.student_id
        ? Number(req.query.student_id)
        : undefined;
      const statusParam = req.query.status as string;
      const time_slot_id = req.query.time_slot_id
        ? Number(req.query.time_slot_id)
        : undefined;
      let status: AppointmentStatus | undefined;

      if (!user_id) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          message: "user_id is required",
        });
        return;
      }

      if (
        statusParam &&
        Object.values(AppointmentStatus).includes(
          statusParam as AppointmentStatus
        )
      ) {
        status = statusParam as AppointmentStatus;
      }

      const appointments = await AppointmentsService.getAppointmentsByUserId(
        user_id,
        student_id,
        status,
        time_slot_id
      );

      if (appointments.length > 0) {
        res.status(HTTP_STATUS.OK).json({
          message: APPOINTMENTS_MESSAGES.RETRIEVE_SUCCESS,
          data: appointments.map((appointment) => ({
            appointment_id: appointment.appointment_id.toString(),
            fullName: appointment.user.firstName + " " + appointment.user.lastName,
            start_time: appointment.timeSlot.start_time,
            end_time: appointment.timeSlot.end_time,
            status: appointment.status,
            date: appointment.date,
            linkMeeting: appointment.linkMeeting,
          })),
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

  static async getAppointmentsByUser(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const user_id = Number(req.query.user_id);
      const statusParam = req.query.status as string;
      const time_slot_id = req.query.time_slot_id
        ? Number(req.query.time_slot_id)
        : undefined;
      let status: AppointmentStatus | undefined;

      if (!user_id) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          message: "user_id is required",
        });
        return;
      }

      if (
        statusParam &&
        Object.values(AppointmentStatus).includes(
          statusParam as AppointmentStatus
        )
      ) {
        status = statusParam as AppointmentStatus;
      }

      const appointments = await AppointmentsService.getAppointmentsByUser(
        user_id,
        status,
        time_slot_id
      );

      if (appointments.length > 0) {
        res.status(HTTP_STATUS.OK).json({
          message: APPOINTMENTS_MESSAGES.RETRIEVE_SUCCESS,
          data: appointments.map((appointment) => ({
            appointment_id: appointment.appointment_id.toString(),
            firstNamePys: appointment.timeSlot.user.firstName,
            lastNamePys: appointment.timeSlot.user.lastName,
            start_time: appointment.timeSlot.start_time,
            end_time: appointment.timeSlot.end_time,
            status: appointment.status,
            date: appointment.date,
            linkMeeting: appointment.linkMeeting,
          })),
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
      const { user_id, appointments } = req.body;
      const createdBy = (req as any).user?.id?.toString();

      const createdAppointments = await AppointmentsService.createAppointments(
        user_id,
        appointments,
        createdBy
      );

      res.status(HTTP_STATUS.CREATED).json({
        message: APPOINTMENTS_MESSAGES.CREATE_SUCCESS,
        data: createdAppointments,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: APPOINTMENTS_MESSAGES.CREATE_FAILURE,
        error: error.message,
      });
    }
  }

  static async updateAppointments(req: Request, res: Response): Promise<void> {
    try {
      const appointment_id = Number(req.params.id);
      const { status, linkMeeting } = req.body;
      const updatedBy = (req as any).user?.id?.toString();

      const updatedAppointment = await AppointmentsService.updateAppointments(
        appointment_id,
        { status, linkMeeting },
        updatedBy
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
