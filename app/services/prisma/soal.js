const prisma = require("../../db/index");
const { BadRequestError } = require("../../errors");

const getAllSoal = async (req) => {
  const result = await prisma.tbl_question.findMany({
    where: {
      kd_soal: req.params.kd_soal,
    },
    include: {
      tbl_options: true,
      kode: {
        select: {
          end_time: true, // Hanya mengambil end_time dari tbl_exam
        },
      },
    },
  });
  return result;
};

const bulkInsert = async (data) => {
  const insertPromises = data.map((question) =>
    prisma.tbl_question.create({
      data: {
        ...question,
        tbl_options: {
          create: question.tbl_options,
        },
      },
    })
  );
  const result = await prisma.$transaction(insertPromises);

  return result;
};

const removeSoal = async (req) => {
  const result = await prisma.tbl_question.delete({
    where: {
      kode: req.params.kd_soal,
    },
  });
  return result;
};

module.exports = { getAllSoal, bulkInsert, removeSoal };
