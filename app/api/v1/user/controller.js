const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../../../errors');
const validateUser = require('./model');
const {createUser, getAllUser} = require('../../../services/prisma/user');

const create = async (req, res, next) => {
    try{
        const { username, password, confirmPassword} = req.body;
        // Validasi data menggunakan Joi
        const { error } = validateUser({ username: username, password: password});
        if (error) {
            throw new BadRequestError(error.details[0].message);
        }
        if (password !== confirmPassword) throw new BadRequestError('Password tidak sama');

        // Simpan data ke basis data menggunakan Prisma
        const result = await createUser(req);
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
        const result = await getAllUser();
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

