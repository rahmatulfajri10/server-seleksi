-- CreateTable
CREATE TABLE "tbl_proctor" (
    "id" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "kamera" TEXT NOT NULL,
    "screen" TEXT NOT NULL,
    "response_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_proctor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tbl_proctor" ADD CONSTRAINT "tbl_proctor_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "tbl_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
