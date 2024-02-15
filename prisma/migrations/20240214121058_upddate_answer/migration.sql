/*
  Warnings:

  - You are about to drop the column `user_response` on the `tbl_answer` table. All the data in the column will be lost.
  - Added the required column `id_option_user_response` to the `tbl_answer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tbl_answer" DROP COLUMN "user_response",
ADD COLUMN     "id_option_user_response" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "tbl_answer" ADD CONSTRAINT "tbl_answer_id_option_user_response_fkey" FOREIGN KEY ("id_option_user_response") REFERENCES "tbl_option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
