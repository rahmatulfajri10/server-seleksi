/*
  Warnings:

  - You are about to drop the column `kd_role` on the `tbl_user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tbl_user" DROP CONSTRAINT "tbl_user_kd_role_fkey";

-- AlterTable
ALTER TABLE "tbl_user" DROP COLUMN "kd_role";
