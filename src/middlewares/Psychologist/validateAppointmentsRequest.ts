import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function validateAppointmentsRequest(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { user_id, time_slot_id, date, status } = req.body;

  if (!user_id || !time_slot_id || !date || !status) {
    res.status(400).json({ message: "user_id, time_slot_id, date, and status are required" });
    return;
  }

  const existingAppointment = await prisma.appointments.findFirst({
    where: {
      user_id: user_id,
      time_slot_id: time_slot_id,
      date: new Date(date),
    },
  });

  if (existingAppointment) {
    res.status(400).json({ message: "An appointment with this time slot and date already exists" });
    return;
  }

  next();
}