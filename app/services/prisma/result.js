const { captureRejectionSymbol } = require("nodemailer/lib/xoauth2");
const prisma = require("../../db/index");
const { BadRequestError } = require("../../errors");

const createResult = async (req) => {
  try {
    const score = await prisma.tbl_answer.findMany({
      where: {
        id_user: parseInt(req.body.id_user),
        kd_soal: req.body.kd_soal,
      },
      select: {
        kd_soal: true,
        id_user: true,
        user_response: {
          select: {
            score: true,
          },
        },
      },
    });
    const totalScore = score.reduce(
      (total, item) => total + item.user_response.score,
      0
    );

    const result = await prisma.tbl_result.create({
      data: {
        id_user: parseInt(req.body.id_user),
        kd_soal: req.body.kd_soal,
        score: totalScore,
      },
    });
    return result;
  } catch (error) {
    throw new BadRequestError(error);
  }
};

const getAllResult = async () => {
  // Dapatkan semua hasil
  const results = await prisma.tbl_result.findMany({
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  // Dapatkan semua partisipan
  const participants = await prisma.tbl_participant.findMany();

  // Gabungkan hasil dan partisipan berdasarkan id_user
  const combined = results.map((result) => {
    const participant = participants.find(
      (participant) => participant.id_user === result.id_user
    );
    return {
      ...result,
      participant,
    };
  });
  return combined;
};

const countResult = async () => {
  const result = await prisma.tbl_result.count();
  return result;
};

module.exports = {
  createResult,
  getAllResult,
  countResult,
};
