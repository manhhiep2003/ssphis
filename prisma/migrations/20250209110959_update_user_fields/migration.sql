/*
  Warnings:

  - Made the column `role_code` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_code` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_role_code_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "role_code" SET NOT NULL,
ALTER COLUMN "user_code" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_role_code_fkey" FOREIGN KEY ("role_code") REFERENCES "role"("role_code") ON DELETE RESTRICT ON UPDATE CASCADE;
