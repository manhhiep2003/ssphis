-- AlterTable
ALTER TABLE "program" ADD COLUMN     "frequency" VARCHAR(20),
ADD COLUMN     "rating_count" INTEGER,
ADD COLUMN     "time" VARCHAR(10);

-- CreateTable
CREATE TABLE "instructor" (
    "instructor_id" BIGSERIAL NOT NULL,
    "instructor_name" VARCHAR(50),
    "instructor_image" TEXT,
    "instructor_experience" VARCHAR(100),
    "instructor_description" VARCHAR(200),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(36),
    "modified_at" TIMESTAMPTZ(3),
    "modified_by" VARCHAR(36),

    CONSTRAINT "instructor_pkey" PRIMARY KEY ("instructor_id")
);
