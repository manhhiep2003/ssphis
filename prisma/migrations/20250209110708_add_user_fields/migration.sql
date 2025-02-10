/*
  Warnings:

  - A unique constraint covering the columns `[user_code]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "first_name" VARCHAR(50),
ADD COLUMN     "last_name" VARCHAR(50),
ADD COLUMN     "user_code" VARCHAR(36);

-- CreateIndex
CREATE UNIQUE INDEX "user_user_code_key" ON "user"("user_code");
