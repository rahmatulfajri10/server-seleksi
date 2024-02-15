const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../../../errors');
const { bulkInsertUserResponses } = require('../../../services/prisma/answer');

const create = async (req, res, next) => {
    try{
        const userResponses = req.body;

    // Melakukan validasi data jika diperlukan

        const result = await bulkInsertUserResponses(userResponses);

        res.status(201).json(result);
    
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

