/*
  Warnings:

  - You are about to drop the column `created_date` on the `markdowns` table. All the data in the column will be lost.
  - You are about to drop the column `modified_date` on the `markdowns` table. All the data in the column will be lost.
  - You are about to drop the column `created_date` on the `permission` table. All the data in the column will be lost.
  - You are about to drop the column `modified_date` on the `permission` table. All the data in the column will be lost.
  - You are about to drop the column `created_date` on the `role` table. All the data in the column will be lost.
  - You are about to drop the column `modified_date` on the `role` table. All the data in the column will be lost.
  - You are about to drop the column `created_date` on the `time_slots` table. All the data in the column will be lost.
  - You are about to drop the column `modified_date` on the `time_slots` table. All the data in the column will be lost.
  - You are about to drop the column `created_date` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `modified_date` on the `user` table. All the data in the column will be lost.
  - Added the required column `modified_at` to the `permission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "created_by" VARCHAR(36),
ADD COLUMN     "modified_at" TIMESTAMPTZ(3),
ADD COLUMN     "modified_by" VARCHAR(36),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "markdowns" DROP COLUMN "created_date",
DROP COLUMN "modified_date",
ADD COLUMN     "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modified_at" TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "permission" DROP COLUMN "created_date",
DROP COLUMN "modified_date",
ADD COLUMN     "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modified_at" TIMESTAMPTZ(3) NOT NULL,
ALTER COLUMN "created_by" DROP NOT NULL;

-- AlterTable
ALTER TABLE "role" DROP COLUMN "created_date",
DROP COLUMN "modified_date",
ADD COLUMN     "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modified_at" TIMESTAMPTZ(3),
ALTER COLUMN "created_by" DROP NOT NULL;

-- AlterTable
ALTER TABLE "time_slots" DROP COLUMN "created_date",
DROP COLUMN "modified_date",
ADD COLUMN     "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modified_at" TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "user" DROP COLUMN "created_date",
DROP COLUMN "modified_date",
ADD COLUMN     "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modified_at" TIMESTAMPTZ(3);
