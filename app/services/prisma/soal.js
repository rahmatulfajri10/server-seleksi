const prisma = require('../../db/index')
const { BadRequestError } = require('../../errors')

const getAllSoal = async (req) => {
    const result = await prisma.tbl_question.findMany({
        where: {
            kd_soal: req.params.kd_soal,
        },
        include: {
            tbl_options: true,
        },
    });
    return result;
}

const bulkInsert = async (data) => {
    const insertPromises = data.map(question => prisma.tbl_question.create({
        data: {
            ...question,
            tbl_options: {
                create: question.tbl_options,
            },
        },
    }));
    const result = await prisma.$transaction(insertPromises);
    return result;
};

module.exports = { getAllSoal, bulkInsert }