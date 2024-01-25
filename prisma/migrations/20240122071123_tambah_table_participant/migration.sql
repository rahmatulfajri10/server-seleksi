-- CreateTable
CREATE TABLE "tbl_participant" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "ket_jabatan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbl_participant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tbl_participant" ADD CONSTRAINT "tbl_participant_username_fkey" FOREIGN KEY ("username") REFERENCES "tbl_user"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
