-- DropForeignKey
ALTER TABLE "question" DROP CONSTRAINT "question_survey_id_fkey";

-- DropForeignKey
ALTER TABLE "question_option" DROP CONSTRAINT "question_option_question_id_fkey";

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_survey_id_fkey" FOREIGN KEY ("survey_id") REFERENCES "survey"("survey_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_option" ADD CONSTRAINT "question_option_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "question"("question_id") ON DELETE CASCADE ON UPDATE CASCADE;
