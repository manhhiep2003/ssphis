/*
  Warnings:

  - Added the required column `anxiety_level` to the `survey_result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anxiety_score` to the `survey_result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `depression_level` to the `survey_result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `depression_score` to the `survey_result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stress_level` to the `survey_result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stress_score` to the `survey_result` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "survey_result" ADD COLUMN     "anxiety_level" VARCHAR(20) NOT NULL,
ADD COLUMN     "anxiety_score" INTEGER NOT NULL,
ADD COLUMN     "depression_level" VARCHAR(20) NOT NULL,
ADD COLUMN     "depression_score" INTEGER NOT NULL,
ADD COLUMN     "stress_level" VARCHAR(20) NOT NULL,
ADD COLUMN     "stress_score" INTEGER NOT NULL;
