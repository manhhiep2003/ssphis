/*
  Warnings:

  - Added the required column `value` to the `question_option` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "question_option" ADD COLUMN     "value" INTEGER NOT NULL;
