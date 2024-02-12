/*
  Warnings:

  - You are about to drop the column `tipe_soal` on the `tbl_exam` table. All the data in the column will be lost.
  - Added the required column `tipe_soal` to the `tbl_question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tbl_exam" DROP CONSTRAINT "tbl_exam_tipe_soal_fkey";

-- AlterTable
ALTER TABLE "tbl_exam" DROP COLUMN "tipe_soal";

-- AlterTable
ALTER TABLE "tbl_question" ADD COLUMN     "tipe_soal" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "tbl_question" ADD CONSTRAINT "tbl_question_tipe_soal_fkey" FOREIGN KEY ("tipe_soal") REFERENCES "tbl_tipe_soal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
