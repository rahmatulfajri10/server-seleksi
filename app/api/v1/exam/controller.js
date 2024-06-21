const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../../../errors");
const {
  createExam,
  getAllExam,
  deleteExam,
  updateStatusExam,
  updateExam,
  countExam,
} = require("../../../services/prisma/exam");
const { validateExam } = require("./model");

const create = async (req, res, next) => {
  try {
    const {
      kode_soal,
      nama,
      description,
      start_datetime,
      end_datetime,
      max_score,
      min_pass_score,
      duration,
    } = req.body;

    // Validasi data menggunakan Joi
    const { error } = validateExam({
      kode_soal: kode_soal,
      nama: nama,
      description: description,
      start_datetime: start_datetime,
      end_datetime: end_datetime,
      max_score: max_score,
      min_pass_score: min_pass_score,
      duration: duration,
    });
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    // Simpan data ke basis data menggunakan Prisma
    const result = await createExam(req);
    res.status(StatusCodes.ACCEPTED).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllExam();
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const { kd_soal } = req.params;
    await deleteExam(kd_soal);
    res.status(200).json({
      status: "success",
      message: "Exam deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const result = await updateStatusExam(req);
    res.status(StatusCodes.ACCEPTED).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateExam(req);
    res.status(StatusCodes.ACCEPTED).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const count = async (req, res, next) => {
  try {
    const result = await countExam();
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  index,
  remove,
  updateStatus,
  update,
  count,
};
