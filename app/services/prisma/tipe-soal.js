const prisma = require('../../db/index')
const { BadRequestError } = require('../../errors')
const getAllTipeSoal = async () => {
    const result = await prisma.tbl_tipe_soal.findMany()
    return result
}

module.exports = { getAllTipeSoal }