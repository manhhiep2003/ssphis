-- CreateTable
CREATE TABLE "survey_result_detail" (
    "survey_result_detail_id" BIGSERIAL NOT NULL,
    "survey_result_id" BIGINT NOT NULL,
    "question_id" BIGINT NOT NULL,
    "question_option_id" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(36),
    "modified_at" TIMESTAMPTZ(3),
    "modified_by" VARCHAR(36),

    CONSTRAINT "survey_result_detail_pkey" PRIMARY KEY ("survey_result_detail_id")
);

-- AddForeignKey
ALTER TABLE "survey_result_detail" ADD CONSTRAINT "survey_result_detail_survey_result_id_fkey" FOREIGN KEY ("survey_result_id") REFERENCES "survey_result"("survey_result_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "survey_result_detail" ADD CONSTRAINT "survey_result_detail_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "question"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "survey_result_detail" ADD CONSTRAINT "survey_result_detail_question_option_id_fkey" FOREIGN KEY ("question_option_id") REFERENCES "question_option"("option_id") ON DELETE RESTRICT ON UPDATE CASCADE;
