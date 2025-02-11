/*
  Warnings:

  - You are about to drop the column `created_at` on the `time_slots` table. All the data in the column will be lost.
  - Added the required column `modified_date` to the `markdowns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "markdowns" ADD COLUMN     "created_by" VARCHAR(36),
ADD COLUMN     "created_date" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modified_by" VARCHAR(36),
ADD COLUMN     "modified_date" TIMESTAMPTZ(3) NOT NULL;

-- AlterTable
ALTER TABLE "time_slots" DROP COLUMN "created_at",
ADD COLUMN     "created_by" VARCHAR(36),
ADD COLUMN     "created_date" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modified_by" VARCHAR(36),
ADD COLUMN     "modified_date" TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "created_by" DROP NOT NULL;
