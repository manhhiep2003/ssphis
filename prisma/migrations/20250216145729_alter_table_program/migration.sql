/*
  Warnings:

  - The primary key for the `program` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `survey_id` on the `program` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "program" DROP CONSTRAINT "program_pkey",
DROP COLUMN "survey_id",
ADD COLUMN     "program_id" BIGSERIAL NOT NULL,
ADD CONSTRAINT "program_pkey" PRIMARY KEY ("program_id");
