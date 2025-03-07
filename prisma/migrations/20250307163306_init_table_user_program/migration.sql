-- CreateTable
CREATE TABLE "user_program" (
    "user_id" BIGINT NOT NULL,
    "program_id" BIGINT NOT NULL,
    "joined_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_program_pkey" PRIMARY KEY ("user_id","program_id")
);

-- AddForeignKey
ALTER TABLE "user_program" ADD CONSTRAINT "user_program_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_program" ADD CONSTRAINT "user_program_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "program"("program_id") ON DELETE RESTRICT ON UPDATE CASCADE;
