/*
  Warnings:

  - You are about to drop the column `ket_jabatan` on the `tbl_participant` table. All the data in the column will be lost.
  - Added the required column `nik` to the `tbl_participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `no_pendaftaran` to the `tbl_participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url_foto` to the `tbl_participant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tbl_participant" DROP COLUMN "ket_jabatan",
ADD COLUMN     "nik" TEXT NOT NULL,
ADD COLUMN     "no_pendaftaran" TEXT NOT NULL,
ADD COLUMN     "url_foto" TEXT NOT NULL;
