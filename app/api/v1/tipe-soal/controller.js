const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../../../errors');
const { getAllTipeSoal } = require('../../../services/prisma/tipe-soal');



const index = async (req, res, next) => {
  try{
    const result = await getAllTipeSoal();
    res.status(StatusCodes.OK).json({
        data: result,
    });
  }catch(err){
    next(err);  
  } 
};


module.exports = {index};