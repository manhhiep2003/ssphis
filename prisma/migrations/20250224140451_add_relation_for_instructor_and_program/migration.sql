/*
  Warnings:

  - Added the required column `programId` to the `instructor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "instructor" ADD COLUMN     "programId" BIGINT NOT NULL;

-- AddForeignKey
ALTER TABLE "instructor" ADD CONSTRAINT "instructor_programId_fkey" FOREIGN KEY ("programId") REFERENCES "program"("program_id") ON DELETE RESTRICT ON UPDATE CASCADE;
