const { StatusCodes } = require('http-status-codes');
const  validateRole  = require('./model');
const { getAllRole, createRole } = require('../../../services/prisma/role');
const { BadRequestError } = require('../../../errors');

const create = async (req, res, next) => {
  try{
    const { ur_role } = req.body;
    // Validasi data menggunakan Joi
    const { error } = validateRole({ ur_role: ur_role });
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    // Simpan data ke basis data menggunakan Prisma
    const result = await createRole(ur_role);
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
    const result = await getAllRole();
    res.status(StatusCodes.OK).json({
        data: result,
    });
  }catch(err){
    next(err);  
  } 
};


module.exports = {index, create};