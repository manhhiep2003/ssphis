import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function validateTimeSlotsRequest(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { user_id, slots } = req.body;

  if (!user_id || !slots || !Array.isArray(slots) || slots.length === 0) {
    res.status(400).json({ message: "user_id and slots array are required" });
    return;
  }
  const validSlots = slots.filter((slot) => slot.start_time && slot.end_time);
  if (validSlots.length === 0) {
    res
      .status(400)
      .json({ message: "Each slot must have start_time and end_time" });
    return;
  }
  const existingSlots = await prisma.time_Slots.findMany({
    where: {
      user_id: user_id,
      OR: validSlots.map((slot) => ({ start_time: slot.start_time })),
    },
  });

  if (existingSlots.length > 0) {
    res
      .status(400)
      .json({ message: "A time slot with this start_time already exists" });
    return;
  }

  next();
}

export function validateUserIdRequest(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { user_id } = req.query;

  if (!user_id) {
    res.status(400).json({ message: "user_id is required" });
    return;
  }

  next();
}