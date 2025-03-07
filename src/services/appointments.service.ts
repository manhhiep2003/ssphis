/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";

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
        createdAt: "desc",
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
        timeSlot: {
          include: {
            user: true,
          },
        },
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
          user: {
            id: appointment.timeSlot.user.id.toString(),
            firstName: appointment.timeSlot.user.firstName,
            lastName: appointment.timeSlot.user.lastName,
            email: appointment.timeSlot.user.email,
          },
        },
      };
    }
    return null;
  }

  static async getAppointmentsByUserId(
    user_id: number,
    student_id?: number,
    status?: AppointmentStatus,
    time_slot_id?: number,
  ) {
    // Build where condition
    const whereCondition: any = {
      timeSlot: {
        user_id: user_id,
      },
    };

    if (student_id) {
      whereCondition.user_id = student_id;
    }

    if (status) {
      whereCondition.status = status;
    }

    if (time_slot_id) {
      whereCondition.time_slot_id = time_slot_id;
    }

    const appointments = await prisma.appointments.findMany({
      where: whereCondition,
      include: {
        user: true,
        timeSlot: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
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
        user: {
          id: appointment.timeSlot.user.id.toString(),
          firstName: appointment.timeSlot.user.firstName,
          lastName: appointment.timeSlot.user.lastName,
          email: appointment.timeSlot.user.email,
        },
      },
    }));
  }

  static async getAppointmentsByUser(
    user_id: number,
    status?: AppointmentStatus,
    time_slot_id?: number,
  ) {
    const whereCondition: any = {
      user_id: user_id,
    };

    if (status) {
      whereCondition.status = status;
    }

    if (time_slot_id) {
      whereCondition.time_slot_id = time_slot_id;
    }

    const appointments = await prisma.appointments.findMany({
      where: whereCondition,
      include: {
        user: true,
        timeSlot: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
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
        user: {
          id: appointment.timeSlot.user.id.toString(),
          firstName: appointment.timeSlot.user.firstName,
          lastName: appointment.timeSlot.user.lastName,
          email: appointment.timeSlot.user.email,
        },
      },
    }));
  }

  static async createAppointments(user_id: number, appointments: any[], createdBy: string) {
    const createdAppointments = [];

    for (const appointment of appointments) {
      const { time_slot_id, date, notes } = appointment;
      const status = AppointmentStatus.Pending;

      const newAppointment = await prisma.appointments.create({
        data: {
          user_id,
          time_slot_id,
          date: new Date(date),
          notes,
          status,
          createdBy,
        },
      });

      createdAppointments.push({
        ...newAppointment,
        appointment_id: newAppointment.appointment_id.toString(),
        user_id: newAppointment.user_id.toString(),
        time_slot_id: newAppointment.time_slot_id.toString(),
      });
    }

    return createdAppointments;
  }

  static async updateAppointments(
    appointment_id: number,
    data: { status: AppointmentStatus; linkMeeting?: string },
    updatedBy: string,
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
