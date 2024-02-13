const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../../../errors');
const { createExam, getAllExam } = require('../../../services/prisma/exam');
const { validateExam } = require('./model');

const create = async (req, res, next) => {
    try{
        const {  kode_soal, nama, description, start_datetime, end_datetime, max_score, min_pass_score, duration} = req.body;
        
        // Validasi data menggunakan Joi
        const { error } = validateExam({kode_soal: kode_soal, nama: nama, description: description, start_datetime: start_datetime, end_datetime: end_datetime, max_score: max_score, min_pass_score: min_pass_score, duration: duration});
        if (error) {
            throw new BadRequestError(error.details[0].message);
        }
        
        // Simpan data ke basis data menggunakan Prisma
        const result = await createExam(req);
        res.status(StatusCodes.ACCEPTED).json({
            status: 'success',
            data: result,
        });
    }
    catch(err){
        next(err);
    }
}

const index = async (req, res, next) => {
    try{
        const result = await getAllExam();
        res.status(StatusCodes.OK).json({
            data: result,
        });
    }
    catch(err){
        next(err);
    }
}

module.exports = {
    create,
    index
};

