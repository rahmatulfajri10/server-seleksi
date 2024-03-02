/*
  Warnings:

  - Made the column `no_telp` on table `tbl_participant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "tbl_participant" ALTER COLUMN "no_telp" SET NOT NULL;
