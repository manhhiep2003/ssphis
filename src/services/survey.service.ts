import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export class SurveyService {
  static async createSurvey(data: {
    title: string;
    description?: string;
    categoryId: bigint;
    questions?: {
      questionText: string;
      options: {
        value: number;
        optionText: string;
      }[];
    }[];
  }) {
    return await prisma.$transaction(async (tx) => {
      const survey = await tx.survey.create({
        data: {
          title: data.title,
          description: data.description,
          categoryId: data.categoryId,
          Question: {
            create: data.questions?.map((q) => ({
              questionText: q.questionText,
              QuestionOption: {
                create: q.options.map((opt) => ({
                  value: opt.value,
                  optionText: opt.optionText,
                })),
              },
            })),
          },
        },
        include: {
          Question: {
            include: {
              QuestionOption: true,
            },
          },
        },
      });

      return JSON.parse(
        JSON.stringify(survey, (_, value) =>
          typeof value === "bigint" ? value.toString() : value,
        ),
      );
    });
  }

  static async getSurveyQuestions(surveyId: bigint) {
    const questions = await prisma.question.findMany({
      where: { surveyId },
      include: {
        QuestionOption: true,
      },
    });

    return questions.map((question) => ({
      questionId: question.questionId.toString(),
      questionText: question.questionText,
      options: question.QuestionOption.map((option) => ({
        optionId: option.optionId.toString(),
        value: option.value,
        optionText: option.optionText,
      })),
    }));
  }

  static async getSurveyDetail(surveyId: bigint) {
    const survey = await prisma.survey.findUnique({
      where: { surveyId },
      include: {
        SurveyResult: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!survey) {
      throw new Error("Survey not found");
    }

    return {
      surveyId: survey.surveyId.toString(),
      title: survey.title,
      description: survey.description,
      categoryId: survey.categoryId.toString(),
      createdAt: survey.createdAt,
      createdBy: survey.createdBy,
      updatedAt: survey.updatedAt,
      updatedBy: survey.updatedBy,
      results: survey.SurveyResult.map((result) => ({
        surveyResultId: result.surveyResultId.toString(),
        depressionScore: result.depressionScore,
        anxietyScore: result.anxietyScore,
        stressScore: result.stressScore,
        depressionLevel: result.depressionLevel,
        anxietyLevel: result.anxietyLevel,
        stressLevel: result.stressLevel,
        createdAt: result.createdAt,
        user: {
          id: result.user.id.toString(),
          userCode: result.user.userCode,
          firstName: result.user.firstName,
          lastName: result.user.lastName,
          username: result.user.username,
          email: result.user.email,
          phone: result.user.phone,
          gender: result.user.gender,
          image: result.user.image,
          description: result.user.description,
        },
      })),
    };
  }

  static async getAllSurveys() {
    const surveys = await prisma.survey.findMany();
    const serializedSurveys = surveys.map((survey) => ({
      ...survey,
      surveyId: survey.surveyId.toString(),
      categoryId: survey.categoryId.toString(),
    }));
    return serializedSurveys;
  }

  static async updateSurvey(
    surveyId: number,
    data: { title?: string; description?: string; categoryId?: bigint },
  ) {
    return await prisma.survey.update({
      where: { surveyId },
      data,
    });
  }

  static async deleteSurvey(surveyId: number) {
    return await prisma.survey.delete({
      where: { surveyId },
    });
  }
}
