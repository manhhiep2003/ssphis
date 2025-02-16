-- CreateTable
CREATE TABLE "survey_result" (
    "survey_result_id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "survey_id" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(36),
    "modified_at" TIMESTAMPTZ(3),
    "modified_by" VARCHAR(36),

    CONSTRAINT "survey_result_pkey" PRIMARY KEY ("survey_result_id")
);

-- AddForeignKey
ALTER TABLE "survey_result" ADD CONSTRAINT "survey_result_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "survey_result" ADD CONSTRAINT "survey_result_survey_id_fkey" FOREIGN KEY ("survey_id") REFERENCES "survey"("survey_id") ON DELETE RESTRICT ON UPDATE CASCADE;
