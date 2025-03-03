/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { AppointmentStatus } from "../../services/appointments.service";
import { APPOINTMENTS_MESSAGES } from "../../constants/messages";

const prisma = new PrismaClient();

export async function validateAppointmentsRequest(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { user_id, appointments } = req.body;

  if (!appointments || appointments.length === 0) {
    res.status(400).json({
      message: APPOINTMENTS_MESSAGES.VALIDATION.EMPTY_APPOINTMENTS,
    });
    return;
  }

  try {
    for (const appointment of appointments) {
      const { time_slot_id, date } = appointment;

      // Validate required fields
      if (!user_id || !time_slot_id || !date) {
        res.status(400).json({
          message: APPOINTMENTS_MESSAGES.VALIDATION.REQUIRED_FIELDS,
        });
        return;
      }

      // Check if appointment date is in the past
      const appointmentDate = new Date(date);
      appointmentDate.setHours(0, 0, 0, 0);
      const now = new Date();
      now.setHours(0, 0, 0, 0);

      if (appointmentDate < now) {
        res.status(400).json({
          message: APPOINTMENTS_MESSAGES.VALIDATION.PAST_DATE,
        });
        return;
      }

      // Check if time slot exists and is available
      const timeSlot = await prisma.time_Slots.findUnique({
        where: { time_slot_id },
        include: {
          appointments: {
            where: {
              date: {
                gte: appointmentDate,
                lt: new Date(appointmentDate.getTime() + 24 * 60 * 60 * 1000),
              },
              status: {
                in: [AppointmentStatus.Approved, AppointmentStatus.Pending],
              },
            },
          },
        },
      });

      if (!timeSlot) {
        res.status(400).json({
          message: APPOINTMENTS_MESSAGES.VALIDATION.TIME_SLOT_NOT_FOUND.replace(
            "{id}",
            time_slot_id.toString(),
          ),
        });
        return;
      }

      if (timeSlot.appointments.length > 0) {
        const existingAppointment = timeSlot.appointments[0];
        res.status(400).json({
          message: APPOINTMENTS_MESSAGES.VALIDATION.TIME_SLOT_BOOKED.replace(
            "{startTime}",
            timeSlot.start_time,
          )
            .replace("{endTime}", timeSlot.end_time)
            .replace("{status}", existingAppointment.status)
            .replace("{date}", appointmentDate.toLocaleDateString("vi-VN")),
        });
        return;
      }
    }

    next();
  } catch (error: any) {
    res.status(500).json({
      message: APPOINTMENTS_MESSAGES.CREATE_FAILURE,
      error: error.message,
    });
  }
}
