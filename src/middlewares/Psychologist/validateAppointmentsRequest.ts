import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { AppointmentStatus } from "../../services/appointments.service";

const prisma = new PrismaClient();

export async function validateAppointmentsRequest(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { user_id, appointments } = req.body;

  if (!appointments || appointments.length === 0) {
    res.status(400).json({
      message: "appointments array is required and cannot be empty",
    });
    return;
  }

  for (const appointment of appointments) {
    const { time_slot_id, date } = appointment;

    // Kiểm tra xem tất cả các trường có tồn tại hay không
    if (!user_id || !time_slot_id || !date) {
      res.status(400).json({
        message: "user_id, time_slot_id, and date are required",
      });
      return;
    }

    // Kiểm tra sự tồn tại của user_id trong bảng users
    const userExists = await prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!userExists) {
      res.status(400).json({
        message: "User with id ${user_id} does not exist",
      });
      return;
    }
    // Kiểm tra sự tồn tại của thời gian slot
    const timeSlot = await prisma.time_Slots.findUnique({
      where: { time_slot_id },
    });

    if (!timeSlot) {
      res.status(400).json({
        message: "Time slot with id ${time_slot_id} does not exist",
      });
      return;
    }

    // Kiểm tra xem người dùng đã đặt cuộc hẹn cho time_slot_id này chưa
    // Điều kiện: Nếu trạng thái không phải là "Cancelled"
    const existingAppointment = await prisma.appointments.findFirst({
      where: {
        user_id,
        time_slot_id,
        status: {
          not: AppointmentStatus.Cancelled, // Kiểm tra nếu trạng thái không phải là "Cancelled"
        },
      },
    });

    if (existingAppointment) {
      res.status(400).json({
        message: `User with id ${user_id} has already booked this time slot`,
      });
      return;
    }
  }

  next();
}
