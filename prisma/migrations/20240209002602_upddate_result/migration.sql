/*
  Warnings:

  - You are about to drop the column `scroe` on the `tbl_option` table. All the data in the column will be lost.
  - Added the required column `score` to the `tbl_option` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tbl_option" DROP COLUMN "scroe",
ADD COLUMN     "score" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "tbl_result" (
    "id" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "kd_soal" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "tbl_result_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tbl_result" ADD CONSTRAINT "tbl_result_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "tbl_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_result" ADD CONSTRAINT "tbl_result_kd_soal_fkey" FOREIGN KEY ("kd_soal") REFERENCES "tbl_exam"("kd_soal") ON DELETE RESTRICT ON UPDATE CASCADE;
