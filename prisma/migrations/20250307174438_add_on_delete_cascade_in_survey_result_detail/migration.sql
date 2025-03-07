-- DropForeignKey
ALTER TABLE "survey_result_detail" DROP CONSTRAINT "survey_result_detail_survey_result_id_fkey";

-- AddForeignKey
ALTER TABLE "survey_result_detail" ADD CONSTRAINT "survey_result_detail_survey_result_id_fkey" FOREIGN KEY ("survey_result_id") REFERENCES "survey_result"("survey_result_id") ON DELETE CASCADE ON UPDATE CASCADE;
