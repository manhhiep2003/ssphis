import { Prisma } from "@prisma/client";
import prisma from "../prisma";

export class ProgramService {
  static async createProgram(data: {
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    time?: string;
    frequency?: string;
    targetAudience?: string;
    location?: string;
    organizerEmail?: string;
    contactPhone?: string;
    imageUrl?: string;
    categoryId: bigint;
    price?: Prisma.Decimal;
    rating?: number;
    instructors?: {
      instructorName?: string;
      instructorImage?: string;
      instructorTitle?: string;
      instructorExperience?: string;
      instructorDescription?: string;
    }[];
  }) {
    return await prisma.program.create({
      data: {
        title: data.title,
        description: data.description,
        categoryId: data.categoryId,
        startDate: data.startDate,
        endDate: data.endDate,
        time: data.time,
        frequency: data.frequency,
        targetAudience: data.targetAudience,
        location: data.location,
        organizerEmail: data.organizerEmail,
        contactPhone: data.contactPhone,
        imageUrl: data.imageUrl,
        price: data.price,
        rating: data.rating,
        instructors: {
          create:
            data.instructors?.map((instructor) => ({
              instructorName: instructor.instructorName,
              instructorImage: instructor.instructorImage,
              instructorTitle: instructor.instructorTitle,
              instructorExperience: instructor.instructorExperience,
              instructorDescription: instructor.instructorDescription,
            })) || [],
        },
      },
      include: {
        instructors: true,
      },
    });
  }

  static async joinPrograms(userId: bigint, programIds: bigint[]) {
    const createData = programIds.map((programId) => ({
      userId,
      programId,
    }));

    return await prisma.userProgram.createMany({
      data: createData,
      skipDuplicates: true,
    });
  }

  static async getProgramsByUserId(userId: bigint) {
    const userPrograms = await prisma.userProgram.findMany({
      where: { userId },
      include: { program: true },
    });

    return userPrograms.map((userProgram) => ({
      ...userProgram,
      userId: userProgram.userId.toString(),
      programId: userProgram.programId.toString(),
      program: {
        ...userProgram.program,
        programId: userProgram.program.programId.toString(),
        categoryId: userProgram.program.categoryId?.toString(),
      },
    }));
  }

  static async getProgramById(programId: number) {
    const program = await prisma.program.findUnique({
      where: { programId: programId },
    });
    if (program) {
      return {
        ...program,
        programId: program.programId.toString(),
        categoryId: program.categoryId.toString(),
      };
    }
    return null;
  }

  static async getAllPrograms() {
    const programs = await prisma.program.findMany({
      include: {
        instructors: true,
      },
    });

    const serializedPrograms = programs.map((program) => ({
      ...program,
      programId: program.programId.toString(),
      categoryId: program.categoryId.toString(),
      instructors: program.instructors.map((inst) => ({
        ...inst,
        instructorId: inst.instructorId.toString(),
        programId: inst.programId.toString(),
      })),
    }));

    return serializedPrograms;
  }

  static async updateProgram(
    programId: number,
    data: {
      title: string;
      description?: string;
      startDate: Date;
      endDate: Date;
      time?: string;
      frequency?: string;
      targetAudience?: string;
      location?: string;
      organizerEmail?: string;
      contactPhone?: string;
      imageUrl?: string;
      categoryId: bigint;
      price?: Prisma.Decimal;
      rating?: number;
    },
  ) {
    return await prisma.program.update({
      where: { programId },
      data,
    });
  }

  static async deleteProgram(programId: number) {
    return await prisma.program.delete({
      where: { programId },
    });
  }
}
