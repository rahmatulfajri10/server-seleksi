const prisma = require("../../db/index");
const { BadRequestError } = require("../../errors");

const getAllGrup = async () => {
  const result = await prisma.tbl_grup.findMany();
  return result;
};

const createGrup = async (data) => {
  const isExist = await prisma.tbl_grup.findFirst({
    where: {
      nama_grup: data,
    },
  });
  if (isExist === null) {
    const result = await prisma.tbl_grup.create({
      data: {
        nama_grup: data,
      },
    });
    return result;
  } else {
    throw new BadRequestError("Group tersebut sudah ada di database");
  }
};

module.exports = { getAllGrup, createGrup };
