/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export enum Status {
  Available = "Available",
  Booked = "Booked",
}

export class TimeSlotService {
  static async getAllTimeSlots() {
    const timeSlots = await prisma.time_Slots.findMany({
      include: {
        user: true, // Fetch user details
      },
    });

    return timeSlots.map((slot) => ({
      ...slot,
      time_slot_id: slot.time_slot_id.toString(), // Convert BigInt to string if needed
      user_id: slot.user_id.toString(),
      user: {
        id: slot.user.id.toString(),
        firstName: slot.user.firstName,
        lastName: slot.user.lastName,
        email: slot.user.email,
      },
    }));
  }
  static async getTimeSlotyId(time_slot_id: number) {
    const timeSlot = await prisma.time_Slots.findUnique({
      where: { time_slot_id },
    });
    if (timeSlot) {
      return {
        ...timeSlot,
        time_slot_id: timeSlot.time_slot_id.toString(), // Convert BigInt to string
        user_id: timeSlot.user_id.toString(),
      };
    }
    return null;
  }

  static async getTimeSlotByUserId(user_id: number) {
    const timeSlots = await prisma.time_Slots.findMany({
      where: { user_id },
      include: {
        user: true, // Fetch user details
      },
    });

    return timeSlots.map((slot) => ({
      ...slot,
      time_slot_id: slot.time_slot_id.toString(), // Convert BigInt to string if needed
      user_id: slot.user_id.toString(),
      user: {
        id: slot.user.id.toString(),
        firstName: slot.user.firstName,
        lastName: slot.user.lastName,
        email: slot.user.email,
      },
    }));
  }

  static async createTimeSlots(
    user_id: number,
    slots: { start_time: string; end_time: string }[],
    createdBy: string
  ) {
    const validSlots = slots.filter((slot) => slot.start_time && slot.end_time);

    const createdSlots = await prisma.time_Slots.createMany({
      data: validSlots.map(({ start_time, end_time }) => ({
        user_id,
        start_time,
        end_time,
        status: Status.Available,
        createdBy,
      })),
    });
    return { createdSlots, slots };
  }

  static async updateTimeSlot(
    time_slot_id: number,
    data: { start_time?: string; end_time?: string; status?: Status },
    updatedBy: string
  ) {
    if (data.start_time) {
      const existingSlot = await prisma.time_Slots.findFirst({
        where: { start_time: data.start_time },
      });
      if (existingSlot) {
        throw new Error("A time slot with this start_time already exists");
      }
    }
    const updatedSlot = await prisma.time_Slots.update({
      where: { time_slot_id },
      data: {
        ...data,
        updatedBy, // Add from token
        updatedAt: new Date(),
      },
    });
    return {
      ...updatedSlot,
      user_id: updatedSlot.user_id.toString(),
      time_slot_id: updatedSlot.time_slot_id.toString(), // Convert BigInt to string if needed
    };
  }

  static async deleteTimeSlot(time_slot_id: number) {
    const deletedSlot = await prisma.time_Slots.delete({
      where: { time_slot_id },
    });
    return {
      ...deletedSlot,
      time_slot_id: deletedSlot.time_slot_id.toString(), // Convert BigInt to string if needed
      user_id: deletedSlot.user_id.toString(),
    };
  }

  // static async autoUpdateTimeSlotStatus() {
  //   try {
  //     const now = new Date();
  //     const currentTime = now.getHours() * 60 + now.getMinutes(); // Convert current time to minutes
  //     const allTimeSlots = await prisma.time_Slots.findMany();

  //     const updatePromises = allTimeSlots.map(async (slot) => {
  //       // Convert time strings to minutes since midnight
  //       const [startHours, startMinutes] = slot.start_time.split(":");
  //       const [endHours, endMinutes] = slot.end_time.split(":");

  //       const startTimeInMinutes =
  //         parseInt(startHours) * 60 + parseInt(startMinutes);
  //       const endTimeInMinutes = parseInt(endHours) * 60 + parseInt(endMinutes);
  //       // console.log(startTimeInMinutes, endTimeInMinutes);
  //       // console.log(currentTime);
        
  //       let isCurrentlyActive;
  //       if (endTimeInMinutes < startTimeInMinutes) {
  //         // Handle overnight slots (e.g., 23:00 to 01:00)
  //         isCurrentlyActive =
  //           currentTime >= startTimeInMinutes ||
  //           currentTime <= endTimeInMinutes;
  //       } else {
  //         // Handle same-day slots
  //         isCurrentlyActive =
  //           // currentTime >= startTimeInMinutes &&
  //           currentTime >= endTimeInMinutes;
  //       }
  //       // console.log(isCurrentlyActive && slot.status !== Status.Booked);

  //       if (isCurrentlyActive && slot.status !== Status.Booked) {
  //         return prisma.time_Slots.update({
  //           where: { time_slot_id: slot.time_slot_id },
  //           data: {
  //             status: Status.Booked,
  //             updatedAt: now,
  //             updatedBy: "system",
  //           },
  //         });
  //       } else if (!isCurrentlyActive && slot.status === Status.Booked) {
  //         return prisma.time_Slots.update({
  //           where: { time_slot_id: slot.time_slot_id },
  //           data: {
  //             status: Status.Available,
  //             updatedAt: now,
  //             updatedBy: "system",
  //           },
  //         });
  //       }
  //     });

  //     await Promise.all(updatePromises.filter(Boolean));
  //     return { message: "Time slot statuses updated successfully" };
  //   } catch (error: any) {
  //     throw new Error(`Failed to update time slot statuses: ${error.message}`);
  //   }
  // }

  // static async resetDailyTimeSlots() {
  //   try {
  //     await prisma.time_Slots.updateMany({
  //       where: {
  //         status: Status.Booked,
  //       },
  //       data: {
  //         status: Status.Available,
  //         updatedAt: new Date(),
  //         updatedBy: "system",
  //       },
  //     });

  //     return { message: "Daily time slot reset completed" };
  //   } catch (error: any) {
  //     throw new Error(`Failed to reset time slots: ${error.message}`);
  //   }
  // }
}
