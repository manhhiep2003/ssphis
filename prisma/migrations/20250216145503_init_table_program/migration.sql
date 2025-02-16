-- CreateTable
CREATE TABLE "program" (
    "survey_id" BIGSERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "category_id" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(36),
    "modified_at" TIMESTAMPTZ(3),
    "modified_by" VARCHAR(36),

    CONSTRAINT "program_pkey" PRIMARY KEY ("survey_id")
);

-- AddForeignKey
ALTER TABLE "program" ADD CONSTRAINT "program_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;
