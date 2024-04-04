-- DropForeignKey
ALTER TABLE "tbl_participant" DROP CONSTRAINT "tbl_participant_id_grup_fkey";

-- AlterTable
ALTER TABLE "tbl_participant" ALTER COLUMN "id_grup" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tbl_participant" ADD CONSTRAINT "tbl_participant_id_grup_fkey" FOREIGN KEY ("id_grup") REFERENCES "tbl_grup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
