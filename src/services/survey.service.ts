import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export class SurveyService {
  static async createSurvey(data: {
    title: string;
    description?: string;
    categoryId: bigint;
    createdBy?: string;
    questions?: {
      questionText: string;
      createdBy?: string;
      options: {
        value: number;
        optionText: string;
        createdBy?: string;
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
          typeof value === "bigint" ? value.toString() : value
        )
      );
    });
  }

  static async getSurveyById(surveyId: number) {
    const survey = await prisma.survey.findUnique({
      where: { surveyId },
    });
    if (survey) {
      return {
        ...survey,
        surveyId: survey.surveyId.toString(),
        categoryId: survey.categoryId.toString(),
      };
    }
    return null;
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
    data: { title?: string; description?: string; categoryId?: bigint }
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
