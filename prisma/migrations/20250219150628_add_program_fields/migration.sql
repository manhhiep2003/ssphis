/*
  Warnings:

  - Added the required column `end_date` to the `program` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `program` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "program" ADD COLUMN     "contact_phone" VARCHAR(20),
ADD COLUMN     "end_date" TIMESTAMPTZ(3) NOT NULL,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "location" VARCHAR(255),
ADD COLUMN     "organizer_email" VARCHAR(100),
ADD COLUMN     "start_date" TIMESTAMPTZ(3) NOT NULL,
ADD COLUMN     "target_audience" TEXT;
