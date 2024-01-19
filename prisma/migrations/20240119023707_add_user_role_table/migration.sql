-- CreateTable
CREATE TABLE "tbl_role" (
    "id" SERIAL NOT NULL,
    "kd_role" SERIAL NOT NULL,
    "ur_role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbl_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_user" (
    "id_user" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "kd_role" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbl_user_pkey" PRIMARY KEY ("id_user")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_role_kd_role_key" ON "tbl_role"("kd_role");

-- AddForeignKey
ALTER TABLE "tbl_user" ADD CONSTRAINT "tbl_user_kd_role_fkey" FOREIGN KEY ("kd_role") REFERENCES "tbl_role"("kd_role") ON DELETE RESTRICT ON UPDATE CASCADE;
