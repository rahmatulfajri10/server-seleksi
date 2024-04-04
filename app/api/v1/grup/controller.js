const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../../../errors");
const validateGrup = require("./model");
const { getAllGrup, createGrup } = require("../../../services/prisma/grup");

const create = async (req, res, next) => {
  try {
    const { nama_grup } = req.body;
    // Validasi data menggunakan Joi
    const { error } = validateGrup({ nama_grup: nama_grup });
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    // Simpan data ke basis data menggunakan Prisma
    const result = await createGrup(nama_grup);
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
    const result = await getAllGrup();
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { index, create };
