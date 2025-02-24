import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
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
      },
    });
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
        instructor: true,
      },
    });

    const serializedPrograms = programs.map((program) => ({
      ...program,
      programId: program.programId.toString(),
      categoryId: program.categoryId.toString(),
      instructor: program.instructor.map((inst) => ({
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
    }
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
