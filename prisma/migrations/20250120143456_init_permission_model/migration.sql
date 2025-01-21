-- CreateTable
CREATE TABLE "permission" (
    "id" BIGSERIAL NOT NULL,
    "permission_name" VARCHAR(50) NOT NULL,
    "created_date" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(36) NOT NULL,
    "modified_date" TIMESTAMPTZ(3),
    "modified_by" VARCHAR(36),

    CONSTRAINT "permission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "permission_permission_name_key" ON "permission"("permission_name");
