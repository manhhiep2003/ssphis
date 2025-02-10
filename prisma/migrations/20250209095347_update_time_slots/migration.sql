/*
  Warnings:

  - You are about to drop the column `date` on the `time_slots` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "time_slots" DROP COLUMN "date",
ALTER COLUMN "start_time" SET DATA TYPE TEXT,
ALTER COLUMN "end_time" SET DATA TYPE TEXT;
