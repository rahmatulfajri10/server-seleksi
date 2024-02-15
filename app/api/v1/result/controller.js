const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../../../errors');
const { createResult, getAllResult } = require('../../../services/prisma/result');
const validateResult = require('./model');

const create = async (req, res, next) => {
  try{
    const { id_user, kd_soal } = req.body;
    // Validasi data menggunakan Joi
    const { error } = validateResult({ id_user: id_user, kd_soal: kd_soal});
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    // Simpan data ke basis data menggunakan Prisma
    const result = await createResult(req);
    res.status(StatusCodes.ACCEPTED).json({
        status: 'success',
        data: result,
    });
  }catch(err){
    next(err);  
  } 
};

const index = async (req, res, next) => {
  try{
    const result = await getAllResult();
    res.status(StatusCodes.OK).json({
        data: result,
    });
  }catch(err){
    next(err);  
  } 
};


module.exports = {index, create};