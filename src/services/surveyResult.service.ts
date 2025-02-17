import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export class SurveyResultService {
  static async createSurveyResult(data: { userId: bigint; surveyId: bigint }) {
    return await prisma.surveyResult.create({
      data: {
        userId: data.userId,
        surveyId: data.surveyId,
      },
    });
  }

  static async getSurveyResultById(surveyResultId: number) {
    const surveyResult = await prisma.surveyResult.findUnique({
      where: { surveyResultId },
    });
    if (surveyResult) {
      return {
        ...surveyResult,
        surveyResultId: surveyResult.surveyResultId.toString(),
        userId: surveyResult.userId.toString(),
        surveyId: surveyResult.surveyId.toString(),
      };
    }
    return null;
  }

  static async getAllSurveyResults() {
    const surveyResult = await prisma.surveyResult.findMany();
    const serializedSurveyResults = surveyResult.map((surveyResult) => ({
      ...surveyResult,
      surveyResultId: surveyResult.surveyResultId.toString(),
      userId: surveyResult.userId.toString(),
      surveyId: surveyResult.surveyId.toString(),
    }));
    return serializedSurveyResults;
  }

  static async updateSurveyResult(
    surveyResultId: number,
    data: { userId?: bigint; surveyId?: bigint }
  ) {
    return await prisma.surveyResult.update({
      where: { surveyResultId },
      data,
    });
  }

  static async deleteSurveyResult(surveyResultId: number) {
    return await prisma.surveyResult.delete({
      where: { surveyResultId },
    });
  }
}
