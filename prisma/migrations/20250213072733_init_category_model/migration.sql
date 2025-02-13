-- CreateTable
CREATE TABLE "category" (
    "category_id" BIGSERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(36),
    "modified_at" TIMESTAMPTZ(3),
    "modified_by" VARCHAR(36),

    CONSTRAINT "category_pkey" PRIMARY KEY ("category_id")
);
