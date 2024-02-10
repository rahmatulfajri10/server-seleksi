/*
  Warnings:

  - You are about to drop the column `id_user` on the `tbl_log` table. All the data in the column will be lost.
  - Added the required column `username` to the `tbl_log` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tbl_log" DROP CONSTRAINT "tbl_log_id_user_fkey";

-- AlterTable
ALTER TABLE "tbl_log" DROP COLUMN "id_user",
ADD COLUMN     "username" TEXT NOT NULL;
