-- AlterTable
ALTER TABLE "user" ADD COLUMN     "description" TEXT,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;
