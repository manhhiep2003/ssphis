import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export class ProgramService {
  static async createProgram(data: {
    title: string;
    description?: string;
    categoryId: bigint;
  }) {
    return await prisma.program.create({
      data: {
        title: data.title,
        description: data.description,
        categoryId: data.categoryId,
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
    const programs = await prisma.program.findMany();
    const serializedPrograms = programs.map((program) => ({
      ...program,
      programId: program.programId.toString(),
      categoryId: program.categoryId.toString(),
    }));
    return serializedPrograms;
  }

  static async updateProgram(
    programId: number,
    data: { title?: string; description?: string; categoryId?: bigint }
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
