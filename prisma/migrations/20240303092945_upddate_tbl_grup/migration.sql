/*
  Warnings:

  - Added the required column `id_grup` to the `tbl_participant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tbl_participant" ADD COLUMN     "id_grup" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "tbl_grup" (
    "id" SERIAL NOT NULL,
    "nama_grup" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbl_grup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tbl_participant" ADD CONSTRAINT "tbl_participant_id_grup_fkey" FOREIGN KEY ("id_grup") REFERENCES "tbl_grup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
