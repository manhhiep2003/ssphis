/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import { Status } from "./timeSlot.service";

const prisma = new PrismaClient();
export enum AppointmentStatus {
  Pending = "Pending",
  Approved = "Approved",
  Cancelled = "Cancelled",
  Completed = "Completed",
}
export class AppointmentsService {
  static async getAllAppointments() {
    const appointments = await prisma.appointments.findMany({
      include: {
        user: true,
        timeSlot: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    return appointments.map((appointment) => ({
      ...appointment,
      appointment_id: appointment.appointment_id.toString(),
      user_id: appointment.user_id.toString(),
      time_slot_id: appointment.time_slot_id.toString(),
      user: {
        id: appointment.user.id.toString(),
        firstName: appointment.user.firstName,
        lastName: appointment.user.lastName,
        email: appointment.user.email,
      },
      timeSlot: {
        time_slot_id: appointment.timeSlot.time_slot_id.toString(),
        start_time: appointment.timeSlot.start_time,
        end_time: appointment.timeSlot.end_time,
        status: appointment.timeSlot.status,
      },
    }));
  }

  static async getAppointmentsById(appointment_id: number) {
    const appointment = await prisma.appointments.findUnique({
      where: { appointment_id },
      include: {
        user: true,
        timeSlot: true,
      },
    });

    if (appointment) {
      return {
        ...appointment,
        appointment_id: appointment.appointment_id.toString(),
        user_id: appointment.user_id.toString(),
        time_slot_id: appointment.time_slot_id.toString(),
        user: {
          id: appointment.user.id.toString(),
          firstName: appointment.user.firstName,
          lastName: appointment.user.lastName,
          email: appointment.user.email,
        },
        timeSlot: {
          time_slot_id: appointment.timeSlot.time_slot_id.toString(),
          start_time: appointment.timeSlot.start_time,
          end_time: appointment.timeSlot.end_time,
          status: appointment.timeSlot.status,
        },
      };
    }
    return null;
  }

  static async getAppointmentsByUserId(
    user_id: number,
    status?: AppointmentStatus
  ) {
    // Tạo điều kiện tìm kiếm với `status` nếu có
    const whereCondition: any = { user_id };
    if (status) {
      whereCondition.status = status;
    }

    const appointments = await prisma.appointments.findMany({
      where: whereCondition,
      include: {
        user: true,
        timeSlot: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    return appointments.map((appointment) => ({
      ...appointment,
      appointment_id: appointment.appointment_id.toString(),
      user_id: appointment.user_id.toString(),
      time_slot_id: appointment.time_slot_id.toString(),
      user: {
        id: appointment.user.id.toString(),
        firstName: appointment.user.firstName,
        lastName: appointment.user.lastName,
        email: appointment.user.email,
      },
      timeSlot: {
        time_slot_id: appointment.timeSlot.time_slot_id.toString(),
        start_time: appointment.timeSlot.start_time,
        end_time: appointment.timeSlot.end_time,
        status: appointment.timeSlot.status,
      },
    }));
  }

  static async createAppointments(
    user_id: number,
    appointments: any[],
    createdBy: string
  ) {
    const createdAppointments = [];

    for (const appointment of appointments) {
      const { time_slot_id, date } = appointment;
      // Check if time slot exists
      const timeSlot = await prisma.time_Slots.findUnique({
        where: { time_slot_id },
      });

      const status = AppointmentStatus.Pending;
      const newAppointment = await prisma.appointments.create({
        data: {
          user_id,
          time_slot_id,
          date: new Date(date),
          status,
          createdBy, // Add createdBy from token
        },
      });

      createdAppointments.push({
        ...newAppointment,
        appointment_id: newAppointment.appointment_id.toString(),
        user_id: newAppointment.user_id.toString(),
        time_slot_id: newAppointment.time_slot_id.toString(),
        timeSlot: {
          time_slot_id: timeSlot?.time_slot_id.toString(),
          start_time: timeSlot?.start_time,
          end_time: timeSlot?.end_time,
          status: timeSlot?.status,
          psychologist_id: timeSlot?.user_id.toString(),
        },
      });
    }

    return createdAppointments;
  }

  static async updateAppointments(
    appointment_id: number,
    data: { status: AppointmentStatus; linkMeeting?: string },
    updatedBy: string
  ) {
    const updatedAppointment = await prisma.appointments.update({
      where: { appointment_id },
      data: {
        status: data.status as any,
        linkMeeting: data.linkMeeting,
        updatedBy, // Add updatedBy from token
        updatedAt: new Date(),
      },
    });

    if (data.status === AppointmentStatus.Approved) {
      await prisma.time_Slots.update({
        where: {
          time_slot_id: updatedAppointment.time_slot_id,
        },
        data: {
          status: Status.Booked,
          updatedBy, // Add updatedBy for time slot
          updatedAt: new Date(),
        },
      });
    } else if (data.status === AppointmentStatus.Completed) {
      await prisma.time_Slots.update({
        where: {
          time_slot_id: updatedAppointment.time_slot_id,
        },
        data: {
          status: Status.Available,
          updatedBy, // Add updatedBy for time slot
          updatedAt: new Date(),
        },
      });
    }

    return {
      ...updatedAppointment,
      appointment_id: updatedAppointment.appointment_id.toString(),
      user_id: updatedAppointment.user_id.toString(),
      time_slot_id: updatedAppointment.time_slot_id.toString(),
    };
  }

  static async deleteAppointments(appointment_id: number) {
    const deletedAppointment = await prisma.appointments.delete({
      where: { appointment_id },
    });

    return {
      ...deletedAppointment,
      appointment_id: deletedAppointment.appointment_id.toString(),
      user_id: deletedAppointment.user_id.toString(),
      time_slot_id: deletedAppointment.time_slot_id.toString(),
    };
  }
}
