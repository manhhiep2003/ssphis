/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import HTTP_STATUS from "../constants/httpStatus";
import { ReportsService } from "../services/reports.service";
import { REPORT_MESSAGES } from "../constants/messages";

export class ReportsController {
  static async createReport(req: Request, res: Response) {
    try {
      const appointment_id = Number(req.params.id);
      const { health_level, health_status, feedback, recommendations } = req.body;
      const createdBy = (req as any).user?.id?.toString();

      const report = await ReportsService.createReport({
        appointment_id,
        health_level,
        health_status,
        feedback,
        recommendations,
        createdBy,
      });

      res.status(HTTP_STATUS.CREATED).json({
        message: "Report created successfully",
        data: report,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: "Failed to create report",
        error: error.message,
      });
    }
  }

  static async getReportById(req: Request, res: Response): Promise<void> {
    try {
      const appointment_id = Number(req.params.appointment_id);
      console.log(appointment_id);

      const report_id = Number(req.query.report_id);

      const report = await ReportsService.getReportById(report_id, appointment_id);
      if (!report) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
          message: REPORT_MESSAGES.NOT_FOUND,
        });
        return;
      }

      // Làm phẳng dữ liệu từ report
      const flattenedData = {
        report_id: report.report_id,
        appointment_id: report.appointment_id,
        student_id: report.user_id,
        full_name: report.appointment.user.firstName + " " + report.appointment.user.lastName,
        user_email: report.appointment.user.email,
        user_phone: report.appointment.user.phone,
        health_level: report.health_level,
        health_status: report.health_status,
        feedback: report.feedback,
        recommendations: report.recommendations,
        createdAt: report.createdAt,
        appointment_date: report.appointment.date,
        appointment_status: report.appointment.status,
        time_slot_id: report.appointment.timeSlot.time_slot_id,
        psychologist_id: report.appointment.timeSlot.user_id,
        full_name_pys:
          report.appointment.timeSlot.user.firstName +
          " " +
          report.appointment.timeSlot.user.lastName,
        pys_email: report.appointment.timeSlot.user.email,
        pys_phone: report.appointment.timeSlot.user.phone,
        start_time: report.appointment.timeSlot.start_time,
        end_time: report.appointment.timeSlot.end_time,
      };

      res.status(HTTP_STATUS.OK).json({
        message: REPORT_MESSAGES.RETRIEVE_SUCCESS,
        data: flattenedData,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: REPORT_MESSAGES.RETRIEVE_FAILURE,
        error: error.message,
      });
    }
  }

  static async getAllReports(req: Request, res: Response): Promise<void> {
    try {
      const { health_level, startDate, endDate, userId } = req.query;

      const filters = {
        health_level: health_level as any,
        startDate: startDate ? new Date(startDate as string) : undefined,
        endDate: endDate ? new Date(endDate as string) : undefined,
        userId: userId ? Number(userId) : undefined,
      };

      const reports = await ReportsService.getAllReports(filters);
      // Làm phẳng dữ liệu từ report
      const flattenedData = reports.map((report) => ({
        report_id: report.report_id,
        appointment_id: report.appointment_id,
        student_id: report.user_id,
        full_name: report.appointment.user.firstName + " " + report.appointment.user.lastName,
        user_email: report.appointment.user.email,
        user_phone: report.appointment.user.phone,
        health_level: report.health_level,
        health_status: report.health_status,
        feedback: report.feedback,
        recommendations: report.recommendations,
        createdAt: report.createdAt,
        appointment_date: report.appointment.date,
        appointment_status: report.appointment.status,
        time_slot_id: report.appointment.timeSlot.time_slot_id,
        psychologist_id: report.appointment.timeSlot.user_id,
        full_name_pys:
          report.appointment.timeSlot.user.firstName +
          " " +
          report.appointment.timeSlot.user.lastName,
        pys_email: report.appointment.timeSlot.user.email,
        pys_phone: report.appointment.timeSlot.user.phone,
        start_time: report.appointment.timeSlot.start_time,
        end_time: report.appointment.timeSlot.end_time,
      }));
      res.status(HTTP_STATUS.OK).json({
        message: REPORT_MESSAGES.RETRIEVE_SUCCESS,
        data: flattenedData,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: REPORT_MESSAGES.RETRIEVE_FAILURE,
        error: error.message,
      });
    }
  }
}
