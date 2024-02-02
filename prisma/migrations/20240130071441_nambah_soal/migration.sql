/*
  Warnings:

  - A unique constraint covering the columns `[no_pendaftaran]` on the table `tbl_participant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "tbl_exam" (
    "id" SERIAL NOT NULL,
    "kd_soal" TEXT NOT NULL,
    "category_soal" TEXT NOT NULL,
    "kd_tipe_soal" INTEGER NOT NULL,
    "parent_id" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "max_score" INTEGER NOT NULL,
    "min_pass_score" INTEGER NOT NULL,
    "duration_min" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbl_exam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_tipe_soal" (
    "kd_tipe_soal" SERIAL NOT NULL,
    "type_soal" TEXT NOT NULL,
    "reatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbl_tipe_soal_pkey" PRIMARY KEY ("kd_tipe_soal")
);

-- CreateTable
CREATE TABLE "tbl_question" (
    "id" SERIAL NOT NULL,
    "kd_soal" TEXT NOT NULL,
    "kd_nomor" INTEGER NOT NULL,
    "ur_soal" TEXT NOT NULL,
    "has_foto" INTEGER NOT NULL,
    "url_foto" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbl_question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_option" (
    "id_option" SERIAL NOT NULL,
    "kd_soal" TEXT NOT NULL,
    "kd_nomor" INTEGER NOT NULL,
    "ur_option" TEXT NOT NULL,
    "has_foto" INTEGER NOT NULL,
    "url_foto" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbl_option_pkey" PRIMARY KEY ("id_option")
);

-- CreateTable
CREATE TABLE "tbl_answer" (
    "id" SERIAL NOT NULL,
    "kd_soal" TEXT NOT NULL,
    "kd_nomor" INTEGER NOT NULL,
    "id_option" INTEGER NOT NULL,
    "ur_jawaban" TEXT NOT NULL,
    "nilai" INTEGER NOT NULL,
    "has_foto" INTEGER NOT NULL,
    "url_foto" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbl_answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_checker" (
    "id" SERIAL NOT NULL,
    "no_pendaftaran" TEXT NOT NULL,
    "kd_soal" TEXT NOT NULL,
    "kd_nomor" INTEGER NOT NULL,
    "nilai" INTEGER NOT NULL,
    "total_nilai" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbl_checker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_exam_kd_soal_key" ON "tbl_exam"("kd_soal");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_participant_no_pendaftaran_key" ON "tbl_participant"("no_pendaftaran");

-- AddForeignKey
ALTER TABLE "tbl_exam" ADD CONSTRAINT "tbl_exam_kd_tipe_soal_fkey" FOREIGN KEY ("kd_tipe_soal") REFERENCES "tbl_tipe_soal"("kd_tipe_soal") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_question" ADD CONSTRAINT "tbl_question_kd_soal_fkey" FOREIGN KEY ("kd_soal") REFERENCES "tbl_exam"("kd_soal") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_option" ADD CONSTRAINT "tbl_option_kd_soal_fkey" FOREIGN KEY ("kd_soal") REFERENCES "tbl_exam"("kd_soal") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_answer" ADD CONSTRAINT "tbl_answer_kd_soal_fkey" FOREIGN KEY ("kd_soal") REFERENCES "tbl_exam"("kd_soal") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_answer" ADD CONSTRAINT "tbl_answer_id_option_fkey" FOREIGN KEY ("id_option") REFERENCES "tbl_option"("id_option") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_checker" ADD CONSTRAINT "tbl_checker_no_pendaftaran_fkey" FOREIGN KEY ("no_pendaftaran") REFERENCES "tbl_participant"("no_pendaftaran") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_checker" ADD CONSTRAINT "tbl_checker_kd_soal_fkey" FOREIGN KEY ("kd_soal") REFERENCES "tbl_exam"("kd_soal") ON DELETE RESTRICT ON UPDATE CASCADE;
