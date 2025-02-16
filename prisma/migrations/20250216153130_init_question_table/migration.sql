-- CreateTable
CREATE TABLE "question" (
    "question_id" BIGSERIAL NOT NULL,
    "question_text" VARCHAR(50) NOT NULL,
    "survey_id" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(36),
    "modified_at" TIMESTAMPTZ(3),
    "modified_by" VARCHAR(36),

    CONSTRAINT "question_pkey" PRIMARY KEY ("question_id")
);

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_survey_id_fkey" FOREIGN KEY ("survey_id") REFERENCES "survey"("survey_id") ON DELETE RESTRICT ON UPDATE CASCADE;
