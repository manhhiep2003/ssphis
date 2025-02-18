/*
  Warnings:

  - Added the required column `category_id` to the `markdowns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgageUrl` to the `markdowns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `markdowns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "markdowns" ADD COLUMN     "category_id" BIGINT NOT NULL,
ADD COLUMN     "hashtag" TEXT[],
ADD COLUMN     "imgageUrl" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "markdowns" ADD CONSTRAINT "markdowns_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;
