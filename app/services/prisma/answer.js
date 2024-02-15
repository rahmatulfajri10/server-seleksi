const prisma = require("../../db");
const { BadRequestError } = require("../../errors");
const bulkInsertUserResponses = async (userResponses) => {
    try {
        const result = await prisma.tbl_answer.createMany({
        data: userResponses,
        });
        return result;
    } catch (error) {
        throw new BadRequestError(error.details[0].message);
    }
};

module.exports = {
    bulkInsertUserResponses,
};