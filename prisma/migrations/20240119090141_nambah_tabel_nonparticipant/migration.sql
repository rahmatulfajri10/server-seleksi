-- CreateTable
CREATE TABLE "tbl_nonparticipant" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "ket_jabatan" TEXT NOT NULL,
    "kd_role" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbl_nonparticipant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tbl_nonparticipant" ADD CONSTRAINT "tbl_nonparticipant_username_fkey" FOREIGN KEY ("username") REFERENCES "tbl_user"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_nonparticipant" ADD CONSTRAINT "tbl_nonparticipant_kd_role_fkey" FOREIGN KEY ("kd_role") REFERENCES "tbl_role"("kd_role") ON DELETE RESTRICT ON UPDATE CASCADE;
