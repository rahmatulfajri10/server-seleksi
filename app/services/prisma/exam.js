const prisma = require("../../db/index");
const { BadRequestError, NotFoundError } = require("../../errors");

const getAllExam = async () => {
  const result = await prisma.tbl_exam.findMany({
    select: {
      id: true,
      kd_soal: true,
      nama: true,
      desc: true,
      start_time: true,
      end_time: true,
      max_score: true,
      min_pass_score: true,
      duration: true,
      active: true,
    },
  });
  return result;
};

const createExam = async (req) => {
  const { kode_soal, nama, description, start_datetime, end_datetime } =
    req.body;

  const max_score = parseInt(req.body.max_score);
  const min_pass_score = parseInt(req.body.min_pass_score);
  const duration = parseInt(req.body.duration);
  const check = await prisma.tbl_exam.findFirst({
    where: {
      kd_soal: kode_soal,
    },
  });
  if (check) throw new BadRequestError("Data sudah ada");
  else {
    const result = await prisma.tbl_exam.create({
      data: {
        kd_soal: kode_soal,
        nama: nama,
        desc: description,
        start_time: start_datetime,
        end_time: end_datetime,
        max_score: max_score,
        min_pass_score: min_pass_score,
        duration: duration,
      },
      select: {
        kd_soal: true,
        nama: true,
        desc: true,
        start_time: true,
        end_time: true,
        max_score: true,
        min_pass_score: true,
        duration: true,
        active: true,
      },
    });
    return result;
  }
};

const deleteExam = async (kd_soal) => {
  try {
    // Find all questions related to the exam
    const questions = await prisma.tbl_question.findMany({
      where: {
        kd_soal: kd_soal,
      },
    });
    // For each question, delete all options that reference it
    for (let question of questions) {
      await prisma.tbl_option.deleteMany({
        where: {
          id_question: question.id,
        },
      });
    }

    // Delete all questions related to the exam
    await prisma.tbl_question.deleteMany({
      where: {
        kd_soal: kd_soal,
      },
    });

    await prisma.tbl_answer.deleteMany({
      where: {
        kd_soal: kd_soal,
      },
    });

    await prisma.tbl_result.deleteMany({
      where: {
        kd_soal: kd_soal,
      },
    });

    // Delete the exam
    const result = await prisma.tbl_exam.delete({
      where: {
        kd_soal: kd_soal,
      },
    });

    return result;
  } catch (error) {
    throw new Error("Failed to delete exam: " + error.message);
  }
};

const updateStatusExam = async (req) => {
  const { kd_soal } = req.params;
  const { active } = req.body;
  try {
    const result = await prisma.tbl_exam.update({
      where: {
        kd_soal: kd_soal,
      },
      data: {
        active: parseInt(active),
      },
      select: {
        kd_soal: true,
        active: true,
      },
    });

    return result;
  } catch (error) {
    throw new NotFoundError(`Exam with Kode Soal ${kd_soal} not found`);
  }
};

const updateExam = async (req) => {
  const { id } = req.params;
  const {
    kd_soal,
    nama,
    desc,
    start_time,
    end_time,
    max_score,
    min_pass_score,
    duration,
  } = req.body;
  try {
    const result = await prisma.tbl_exam.update({
      where: {
        id: parseInt(id, 10),
      },
      data: {
        kd_soal: kd_soal,
        nama: nama,
        desc: desc,
        start_time: start_time,
        end_time: end_time,
        max_score: parseInt(max_score, 10),
        min_pass_score: parseInt(min_pass_score, 10),
        duration: parseInt(duration, 10),
      },
      select: {
        kd_soal: true,
      },
    });
    return result;
  } catch (error) {
    throw new NotFoundError(error);
  }
};

const countExam = async () => {
  const result = await prisma.tbl_exam.count();
  return result;
};

module.exports = {
  getAllExam,
  createExam,
  deleteExam,
  updateStatusExam,
  updateExam,
  countExam,
};
