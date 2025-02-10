-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('Pending', 'Approved', 'Cancelled');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Available', 'Booked');

-- CreateTable
CREATE TABLE "appointments" (
    "appointment_id" SERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "time_slot_id" INTEGER NOT NULL,
    "status" "AppointmentStatus" NOT NULL DEFAULT 'Pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("appointment_id")
);

-- CreateTable
CREATE TABLE "time_slots" (
    "time_slot_id" SERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Available',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "time_slots_pkey" PRIMARY KEY ("time_slot_id")
);

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_time_slot_id_fkey" FOREIGN KEY ("time_slot_id") REFERENCES "time_slots"("time_slot_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_slots" ADD CONSTRAINT "time_slots_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
