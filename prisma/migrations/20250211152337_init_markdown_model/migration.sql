-- CreateTable
CREATE TABLE "markdowns" (
    "id" SERIAL NOT NULL,
    "contentHtml" TEXT NOT NULL,
    "contentMarkdown" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "user_id" BIGINT NOT NULL,

    CONSTRAINT "markdowns_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "markdowns_user_id_key" ON "markdowns"("user_id");

-- AddForeignKey
ALTER TABLE "markdowns" ADD CONSTRAINT "markdowns_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
