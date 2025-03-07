/*
  Warnings:

  - You are about to alter the column `question_text` on the `question` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `option_text` on the `question_option` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "question" ALTER COLUMN "question_text" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "question_option" ALTER COLUMN "option_text" SET DATA TYPE VARCHAR(255);
