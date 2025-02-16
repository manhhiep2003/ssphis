-- CreateTable
CREATE TABLE "question_option" (
    "option_id" BIGSERIAL NOT NULL,
    "option_text" VARCHAR(50) NOT NULL,
    "question_id" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(36),
    "modified_at" TIMESTAMPTZ(3),
    "modified_by" VARCHAR(36),

    CONSTRAINT "question_option_pkey" PRIMARY KEY ("option_id")
);

-- AddForeignKey
ALTER TABLE "question_option" ADD CONSTRAINT "question_option_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "question"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;
