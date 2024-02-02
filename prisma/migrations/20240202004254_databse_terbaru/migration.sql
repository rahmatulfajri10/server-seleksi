/*
  Warnings:

  - You are about to drop the column `username` on the `tbl_participant` table. All the data in the column will be lost.
  - You are about to drop the column `kd_role` on the `tbl_role` table. All the data in the column will be lost.
  - The primary key for the `tbl_user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_user` on the `tbl_user` table. All the data in the column will be lost.
  - You are about to drop the `tbl_answer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_checker` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_exam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_nonparticipant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_option` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_tipe_soal` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `email` to the `tbl_participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `tbl_participant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tbl_answer" DROP CONSTRAINT "tbl_answer_id_option_fkey";

-- DropForeignKey
ALTER TABLE "tbl_answer" DROP CONSTRAINT "tbl_answer_kd_soal_fkey";

-- DropForeignKey
ALTER TABLE "tbl_checker" DROP CONSTRAINT "tbl_checker_kd_soal_fkey";

-- DropForeignKey
ALTER TABLE "tbl_checker" DROP CONSTRAINT "tbl_checker_no_pendaftaran_fkey";

-- DropForeignKey
ALTER TABLE "tbl_exam" DROP CONSTRAINT "tbl_exam_kd_tipe_soal_fkey";

-- DropForeignKey
ALTER TABLE "tbl_nonparticipant" DROP CONSTRAINT "tbl_nonparticipant_username_fkey";

-- DropForeignKey
ALTER TABLE "tbl_option" DROP CONSTRAINT "tbl_option_kd_soal_fkey";

-- DropForeignKey
ALTER TABLE "tbl_participant" DROP CONSTRAINT "tbl_participant_username_fkey";

-- DropForeignKey
ALTER TABLE "tbl_question" DROP CONSTRAINT "tbl_question_kd_soal_fkey";

-- DropForeignKey
ALTER TABLE "tbl_user" DROP CONSTRAINT "tbl_user_kd_role_fkey";

-- DropIndex
DROP INDEX "tbl_participant_no_pendaftaran_key";

-- DropIndex
DROP INDEX "tbl_role_kd_role_key";

-- AlterTable
ALTER TABLE "tbl_participant" DROP COLUMN "username",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "id_user" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tbl_role" DROP COLUMN "kd_role";

-- AlterTable
ALTER TABLE "tbl_user" DROP CONSTRAINT "tbl_user_pkey",
DROP COLUMN "id_user",
ADD COLUMN     "active" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "tbl_user_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "tbl_answer";

-- DropTable
DROP TABLE "tbl_checker";

-- DropTable
DROP TABLE "tbl_exam";

-- DropTable
DROP TABLE "tbl_nonparticipant";

-- DropTable
DROP TABLE "tbl_option";

-- DropTable
DROP TABLE "tbl_question";

-- DropTable
DROP TABLE "tbl_tipe_soal";

-- CreateTable
CREATE TABLE "tbl_user_role" (
    "id" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_role" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbl_user_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_privilage" (
    "id" SERIAL NOT NULL,
    "id_role" INTEGER NOT NULL,
    "menu" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbl_privilage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_menu" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "parent" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbl_menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_log" (
    "id" SERIAL NOT NULL,
    "log_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "log_event" TEXT NOT NULL,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "tbl_log_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tbl_user" ADD CONSTRAINT "tbl_user_kd_role_fkey" FOREIGN KEY ("kd_role") REFERENCES "tbl_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_user_role" ADD CONSTRAINT "tbl_user_role_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "tbl_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_user_role" ADD CONSTRAINT "tbl_user_role_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "tbl_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_privilage" ADD CONSTRAINT "tbl_privilage_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "tbl_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_privilage" ADD CONSTRAINT "tbl_privilage_menu_fkey" FOREIGN KEY ("menu") REFERENCES "tbl_menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_participant" ADD CONSTRAINT "tbl_participant_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "tbl_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_log" ADD CONSTRAINT "tbl_log_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "tbl_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
