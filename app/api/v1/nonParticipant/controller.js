const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../../../errors');
const validateUser = require('./model');
const { getAllNonParticipant, createNonParticipant } = require('../../../services/prisma/non-participant');

const create = async (req, res, next) => {
    try{
        const { username, nama, ket_jabatan } = req.body;
        // Validasi data menggunakan Joi
        const { error } = validateUser({ nama: nama,ket_jabatan: ket_jabatan });
        if (error) {
            throw new BadRequestError(error.details[0].message);
        }
        
        // Simpan data ke basis data menggunakan Prisma
        const result = await createNonParticipant(req);
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
        const result = await getAllNonParticipant();
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

