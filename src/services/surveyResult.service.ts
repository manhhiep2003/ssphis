import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export class SurveyResultService {
  static async submitSurveyResult(data: {
    surveyId: bigint;
    userId: bigint;
    answers: {
      questionId: bigint;
      optionId: bigint;
    }[];
  }) {
    return await prisma.$transaction(async (tx) => {
      const survey = await tx.survey.findUnique({
        where: { surveyId: data.surveyId },
        include: {
          Question: {
            include: {
              QuestionOption: true,
            },
          },
        },
      });

      if (!survey) throw new Error("Survey not found");

      const questionMap = new Map(survey.Question.map((q) => [q.questionId.toString(), q]));

      for (const answer of data.answers) {
        const question = questionMap.get(answer.questionId.toString());
        if (!question) {
          throw new Error(
            `Question ${answer.questionId} does not belong to survey ${data.surveyId}`,
          );
        }
        const optionExists = question.QuestionOption.some(
          (opt) => opt.optionId === answer.optionId,
        );
        if (!optionExists) {
          throw new Error(
            `Option ${answer.optionId} does not belong to question ${answer.questionId}`,
          );
        }
      }

      const surveyResult = await tx.surveyResult.create({
        data: {
          surveyId: data.surveyId,
          userId: data.userId,
          depressionScore: 0,
          anxietyScore: 0,
          stressScore: 0,
          depressionLevel: "",
          anxietyLevel: "",
          stressLevel: "",
          SurveyResultDetail: {
            create: data.answers.map((answer) => ({
              questionId: answer.questionId,
              optionId: answer.optionId,
            })),
          },
        },
        include: {
          SurveyResultDetail: {
            include: {
              questionOption: true,
            },
          },
        },
      });

      const totalScore = { depression: 0, anxiety: 0, stress: 0 };

      surveyResult.SurveyResultDetail.forEach((detail, index) => {
        const value = detail.questionOption.value;

        if ([0, 1, 2, 3, 4, 5, 6].includes(index)) {
          totalScore.depression += value;
        } else if ([7, 8, 9, 10, 11, 12, 13].includes(index)) {
          totalScore.anxiety += value;
        } else {
          totalScore.stress += value;
        }
      });

      const resultClassification = {
        depression: classifyDepression(totalScore.depression),
        anxiety: classifyAnxiety(totalScore.anxiety),
        stress: classifyStress(totalScore.stress),
      };

      await tx.surveyResult.update({
        where: { surveyResultId: surveyResult.surveyResultId },
        data: {
          depressionScore: totalScore.depression,
          anxietyScore: totalScore.anxiety,
          stressScore: totalScore.stress,
          depressionLevel: resultClassification.depression,
          anxietyLevel: resultClassification.anxiety,
          stressLevel: resultClassification.stress,
        },
      });

      return {
        surveyResultId: surveyResult.surveyResultId.toString(),
        totalScore,
        resultClassification,
      };
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

  static async getSurveyDetailByUserId(userId: bigint) {
    const surveyResults = await prisma.surveyResult.findMany({
      where: { userId },
      include: {
        survey: {
          include: {
            Question: {
              include: {
                QuestionOption: true,
                SurveyResultDetail: {
                  where: { surveyResult: { userId } }, // Filter theo userId hiện tại
                },
              },
            },
          },
        },
        SurveyResultDetail: true, // Lấy các câu trả lời của user
      },
    });

    if (surveyResults.length === 0) {
      throw new Error("No surveys found for this user");
    }

    return surveyResults.map((result) => ({
      surveyResultId: result.surveyResultId.toString(),
      survey: {
        surveyId: result.survey.surveyId.toString(),
        title: result.survey.title,
        description: result.survey.description,
        categoryId: result.survey.categoryId.toString(),
        createdAt: result.survey.createdAt,
        createdBy: result.survey.createdBy,
        updatedAt: result.survey.updatedAt,
        updatedBy: result.survey.updatedBy,
        questions: result.survey.Question.map((question) => {
          const answerDetail = question.SurveyResultDetail.find(
            (detail) => detail.surveyResultId === result.surveyResultId,
          );

          const selectedOption = question.QuestionOption.find(
            (option) => option.optionId === answerDetail?.optionId,
          );

          return {
            questionId: question.questionId.toString(),
            questionText: question.questionText,
            // options: question.QuestionOption.map((option) => ({
            //   optionId: option.optionId.toString(),
            //   value: option.value,
            //   optionText: option.optionText,
            // })),
            selectedOption: selectedOption
              ? {
                  optionId: selectedOption.optionId.toString(),
                  value: selectedOption.value,
                  optionText: selectedOption.optionText,
                }
              : null,
          };
        }),
      },
      depressionScore: result.depressionScore,
      anxietyScore: result.anxietyScore,
      stressScore: result.stressScore,
      depressionLevel: result.depressionLevel,
      anxietyLevel: result.anxietyLevel,
      stressLevel: result.stressLevel,
      createdAt: result.createdAt,
    }));
  }

  static async updateSurveyResult(
    surveyResultId: number,
    data: { userId?: bigint; surveyId?: bigint },
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

function classifyDepression(score: number) {
  if (score >= 28) return "Extremely Severe";
  if (score >= 21) return "Severe";
  if (score >= 14) return "Moderate";
  if (score >= 10) return "Mild";
  return "Normal";
}

function classifyAnxiety(score: number) {
  if (score >= 20) return "Extremely Severe";
  if (score >= 15) return "Severe";
  if (score >= 10) return "Moderate";
  if (score >= 8) return "Mild";
  return "Normal";
}

function classifyStress(score: number) {
  if (score >= 34) return "Extremely Severe";
  if (score >= 26) return "Severe";
  if (score >= 19) return "Moderate";
  if (score >= 15) return "Mild";
  return "Normal";
}
