import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export class QuestionService {
  static async createQuestion(data: { questionText: string; surveyId: bigint }) {
    return await prisma.question.create({
      data: {
        questionText: data.questionText,
        surveyId: data.surveyId,
      },
    });
  }

  static async getQuestionById(questionId: number) {
    const question = await prisma.question.findUnique({
      where: { questionId: questionId },
    });
    if (question) {
      return {
        ...question,
        questionId: question.questionId.toString(),
        surveyId: question.surveyId.toString(),
      };
    }
    return null;
  }

  static async getAllQuestions() {
    const questions = await prisma.question.findMany();
    const serializedQuestions = questions.map((question) => ({
      ...question,
      questionId: question.questionId.toString(),
      surveyId: question.surveyId.toString(),
    }));
    return serializedQuestions;
  }

  static async updateQuestion(
    questionId: number,
    data: { questionText?: string; surveyId?: bigint },
  ) {
    return await prisma.question.update({
      where: { questionId },
      data,
    });
  }

  static async deleteQuestion(questionId: number) {
    return await prisma.question.delete({
      where: { questionId },
    });
  }
}
