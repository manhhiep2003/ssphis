/*
  Warnings:

  - A unique constraint covering the columns `[role_code]` on the table `role` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `role_code` to the `role` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "role" ADD COLUMN     "role_code" VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role_id" BIGINT;

-- CreateIndex
CREATE UNIQUE INDEX "role_role_code_key" ON "role"("role_code");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE SET NULL ON UPDATE CASCADE;
