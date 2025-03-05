-- CreateEnum
CREATE TYPE "HealthLevel" AS ENUM ('Low', 'Medium', 'High');

-- CreateTable
CREATE TABLE "reports" (
    "report_id" SERIAL NOT NULL,
    "appointment_id" INTEGER NOT NULL,
    "user_id" BIGINT NOT NULL,
    "health_level" "HealthLevel" NOT NULL DEFAULT 'Medium',
    "health_status" TEXT,
    "feedback" TEXT,
    "recommendations" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(36),
    "modified_at" TIMESTAMPTZ(3),
    "modified_by" VARCHAR(36),

    CONSTRAINT "reports_pkey" PRIMARY KEY ("report_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reports_appointment_id_key" ON "reports"("appointment_id");

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("appointment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
