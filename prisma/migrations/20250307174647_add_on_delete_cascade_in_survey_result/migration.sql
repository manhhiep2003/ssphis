-- DropForeignKey
ALTER TABLE "survey_result" DROP CONSTRAINT "survey_result_survey_id_fkey";

-- AddForeignKey
ALTER TABLE "survey_result" ADD CONSTRAINT "survey_result_survey_id_fkey" FOREIGN KEY ("survey_id") REFERENCES "survey"("survey_id") ON DELETE CASCADE ON UPDATE CASCADE;
