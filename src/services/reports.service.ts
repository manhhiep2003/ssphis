/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient, HealthLevel } from "@prisma/client";
import { AppointmentStatus } from "./appointments.service";

const prisma = new PrismaClient();

interface CreateReportDTO {
  appointment_id: number;
  health_level: HealthLevel;
  health_status?: string;
  feedback?: string;
  recommendations?: string;
  createdBy: string;
}

interface FilterOptions {
  health_level?: HealthLevel;
  startDate?: Date;
  endDate?: Date;
  userId?: number;
}

const formatReportData = (data: any) => {
  return JSON.parse(
    JSON.stringify(data, (_, value) => (typeof value === "bigint" ? value.toString() : value)),
  );
};

export class ReportsService {
  static async createReport(data: CreateReportDTO) {
    // Use transaction to ensure both operations succeed or fail together
    return await prisma.$transaction(async (prisma) => {
      // First check if appointment exists and approved
      const appointment = await prisma.appointments.findUnique({
        where: { appointment_id: data.appointment_id },
      });

      if (!appointment) {
        throw new Error("Appointment not found");
      }

      if (appointment.status !== "Approved") {
        throw new Error("Can only create report for approved appointments");
      }

      // Check if report already exists for this appointment
      const existingReport = await prisma.reports.findUnique({
        where: { appointment_id: data.appointment_id },
      });

      if (existingReport) {
        throw new Error("Report already exists for this appointment");
      }

      // Create the report
      const report = await prisma.reports.create({
        data: {
          appointment_id: data.appointment_id,
          user_id: appointment.user_id,
          health_level: data.health_level,
          health_status: data.health_status,
          feedback: data.feedback,
          recommendations: data.recommendations,
          createdBy: data.createdBy,
        },
      });

      // Update appointment status to completed
      await prisma.appointments.update({
        where: { appointment_id: data.appointment_id },
        data: {
          status: AppointmentStatus.Completed,
          updatedBy: data.createdBy,
          updatedAt: new Date(),
        },
      });

      return formatReportData(report);
    });
  }

  static async getReportById(report_id: number, appointment_id?: number) {
    const where: any = {};

    if (report_id) {
      where.report_id = report_id;
    }
    if (appointment_id) {
      where.appointment_id = appointment_id;
    }
    // Return null if no search criteria provided
    if (Object.keys(where).length === 0) {
      return null;
    }
    const report = await prisma.reports.findFirst({
      where,
      include: {
        appointment: {
          include: {
            timeSlot: {
              include: {
                user: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                  },
                },
              },
            },
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    if (!report) return null;
    return formatReportData(report);
  }

  static async getAllReports(filters?: FilterOptions) {
    const where: any = {};

    if (filters?.health_level) {
      where.health_level = filters.health_level;
    }

    if (filters?.userId) {
      where.user_id = BigInt(filters.userId);
    }

    if (filters?.startDate || filters?.endDate) {
      where.createdAt = {};
      if (filters.startDate) {
        where.createdAt.gte = filters.startDate;
      }
      if (filters.endDate) {
        where.createdAt.lte = filters.endDate;
      }
    }

    const reports = await prisma.reports.findMany({
      where,
      include: {
        appointment: {
          include: {
            timeSlot: {
              include: {
                user: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                  },
                },
              },
            },
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return reports.map((report) => formatReportData(report));
  }
}
