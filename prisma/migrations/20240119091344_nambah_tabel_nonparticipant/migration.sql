/*
  Warnings:

  - You are about to drop the column `kd_role` on the `tbl_nonparticipant` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tbl_nonparticipant" DROP CONSTRAINT "tbl_nonparticipant_kd_role_fkey";

-- AlterTable
ALTER TABLE "tbl_nonparticipant" DROP COLUMN "kd_role";
