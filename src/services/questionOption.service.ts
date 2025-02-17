import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export class QuestionOptionService {
  static async createQuestionOption(data: {
    optionText: string;
    questionId: bigint;
  }) {
    return await prisma.questionOption.create({
      data: {
        optionText: data.optionText,
        questionId: data.questionId,
      },
    });
  }

  static async getQuestionOptionById(optionId: number) {
    const option = await prisma.questionOption.findUnique({
      where: { optionId: optionId },
    });
    if (option) {
      return {
        ...option,
        optionId: option.optionId.toString(),
        questionId: option.questionId.toString(),
      };
    }
    return null;
  }

  static async getAllQuestionOptions() {
    const options = await prisma.questionOption.findMany();
    const serializedQuestionOptions = options.map((option) => ({
      ...option,
      optionId: option.optionId.toString(),
      questionId: option.questionId.toString(),
    }));
    return serializedQuestionOptions;
  }

  static async updateQuestionOption(
    optionId: number,
    data: { optionText?: string; questionId?: bigint }
  ) {
    return await prisma.questionOption.update({
      where: { optionId },
      data,
    });
  }

  static async deleteQuestionOption(optionId: number) {
    return await prisma.questionOption.delete({
      where: { optionId },
    });
  }
}
