const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../../../errors");

const { createProctor } = require("../../../services/prisma/proctor");

const create = async (req, res, next) => {
  try {
    // Simpan data ke basis data menggunakan Prisma
    const result = await createProctor(req);
    res.status(StatusCodes.ACCEPTED).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
};
