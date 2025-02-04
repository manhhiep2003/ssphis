/*
  Warnings:

  - You are about to drop the column `role_id` on the `user` table. All the data in the column will be lost.
  - Made the column `created_date` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `modified_date` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_role_id_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "role_id",
ADD COLUMN     "role_code" VARCHAR(20),
ALTER COLUMN "created_date" SET NOT NULL,
ALTER COLUMN "modified_date" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_role_code_fkey" FOREIGN KEY ("role_code") REFERENCES "role"("role_code") ON DELETE SET NULL ON UPDATE CASCADE;
