-- CreateTable
CREATE TABLE "tbl_tipe_soal" (
    "id" SERIAL NOT NULL,
    "tipe_soal" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbl_tipe_soal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_exam" (
    "id" SERIAL NOT NULL,
    "kd_soal" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "desc" TEXT,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "max_score" INTEGER NOT NULL,
    "min_pass_score" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "tipe_soal" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbl_exam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_question" (
    "id" SERIAL NOT NULL,
    "kd_soal" TEXT NOT NULL,
    "soal" TEXT NOT NULL,
    "has_foto" INTEGER NOT NULL DEFAULT 0,
    "url_foto" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbl_question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_option" (
    "id" SERIAL NOT NULL,
    "id_question" INTEGER NOT NULL,
    "option" TEXT NOT NULL,
    "scroe" INTEGER NOT NULL,
    "has_foto" INTEGER NOT NULL DEFAULT 0,
    "url_foto" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbl_option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_answer" (
    "id" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "kd_soal" TEXT NOT NULL,
    "id_question" INTEGER NOT NULL,
    "user_response" TEXT NOT NULL,
    "response_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_answer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_exam_kd_soal_key" ON "tbl_exam"("kd_soal");

-- AddForeignKey
ALTER TABLE "tbl_exam" ADD CONSTRAINT "tbl_exam_tipe_soal_fkey" FOREIGN KEY ("tipe_soal") REFERENCES "tbl_tipe_soal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_question" ADD CONSTRAINT "tbl_question_kd_soal_fkey" FOREIGN KEY ("kd_soal") REFERENCES "tbl_exam"("kd_soal") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_option" ADD CONSTRAINT "tbl_option_id_question_fkey" FOREIGN KEY ("id_question") REFERENCES "tbl_question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_answer" ADD CONSTRAINT "tbl_answer_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "tbl_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_answer" ADD CONSTRAINT "tbl_answer_kd_soal_fkey" FOREIGN KEY ("kd_soal") REFERENCES "tbl_exam"("kd_soal") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_answer" ADD CONSTRAINT "tbl_answer_id_question_fkey" FOREIGN KEY ("id_question") REFERENCES "tbl_question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
