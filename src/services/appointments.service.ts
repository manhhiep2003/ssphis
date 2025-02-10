import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export enum AppointmentStatus {
  Pending = "Pending",
  Approved = "Approved",
  Cancelled = "Cancelled",
}
export class AppointmentsService {
  static async getAllAppointments() {
    const appointments = await prisma.appointments.findMany({
      include: {
        user: true,
        timeSlot: true,
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

  static async getAppointmentsByUserId(user_id: number) {
    const appointments = await prisma.appointments.findMany({
      where: { user_id },
      include: {
        user: true,
        timeSlot: true,
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
    time_slot_id: number,
    date: string,
    status: AppointmentStatus
  ) {
    const appointment = await prisma.appointments.create({
      data: {
        user_id,
        time_slot_id,
        date: new Date(date),
        status,
      },
    });

    return {
      ...appointment,
      appointment_id: appointment.appointment_id.toString(),
      user_id: appointment.user_id.toString(),
      time_slot_id: appointment.time_slot_id.toString(),
    };
  }

  static async updateAppointments(
    appointment_id: number,
    data: { date?: string; status?: AppointmentStatus }
  ) {
    const updatedAppointment = await prisma.appointments.update({
      where: { appointment_id },
      data: {
        ...data,
        date: data.date ? new Date(data.date) : undefined,
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
