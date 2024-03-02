const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../../../errors");
const validateUser = require("./model");
const {
  getAllParticipant,
  createParticipant,
  getOneParticipant,
} = require("../../../services/prisma/participant");

const create = async (req, res, next) => {
  try {
    const { nama, nik, no_pendaftaran, email } = req.body;

    // Validasi data menggunakan Joi
    const { error } = validateUser({
      nama: nama,
      nik: nik,
      no_pendaftaran: no_pendaftaran,
      email: email,
    });
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    // Simpan data ke basis data menggunakan Prisma
    const result = await createParticipant(req);
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
    const result = await getAllParticipant();
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getone = async (req, res, next) => {
  try {
    const result = await getOneParticipant(req);
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
  getone,
};
