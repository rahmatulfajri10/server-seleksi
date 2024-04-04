const prisma = require("../../db/index");
const { BadRequestError } = require("../../errors");
const getAllTipeSoal = async () => {
  const result = await prisma.tbl_tipe_soal.findMany();
  return result;
};

const createTipeSoal = async (data) => {
  // Cek apakah data sudah ada di basis data
  const isExist = await prisma.tbl_tipe_soal.findFirst({
    where: {
      tipe_soal: data,
    },
  });
  if (isExist === null) {
    const result = await prisma.tbl_tipe_soal.create({
      data: {
        tipe_soal: data,
      },
    });
    return result;
  } else {
    throw new BadRequestError("Role tersebut sudah ada di database");
  }
};

module.exports = { getAllTipeSoal, createTipeSoal };
