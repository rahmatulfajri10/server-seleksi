const prisma = require('../../db/index')
const { BadRequestError } = require('../../errors')

const getAllSoal = async () => {
    const result = await prisma.tbl_question.findMany()
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