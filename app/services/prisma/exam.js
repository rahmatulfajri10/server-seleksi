const prisma = require('../../db/index')
const { BadRequestError } = require('../../errors')

const getAllExam = async () => {
    const result = await prisma.tbl_exam.findMany()
    return result;
}

const createExam = async (req) => {
    const {  kode_soal, nama, description, start_datetime, end_datetime} = req.body;
    const max_score = parseInt(req.body.max_score);
    const min_pass_score = parseInt(req.body.min_pass_score);
    const duration = parseInt(req.body.duration);
    const check = await prisma.tbl_exam.findFirst({
        where: {
            kd_soal: kode_soal,
        },
    });
    if (check) throw new BadRequestError('Data sudah ada');
    else{
        const result = await prisma.tbl_exam.create({
            data: {
                kd_soal: kode_soal,
                nama: nama,
                desc: description,
                start_time: start_datetime,
                end_time: end_datetime,
                max_score: max_score,
                min_pass_score: min_pass_score,
                duration: duration
            }
        })
        return result;
    }
    
}

module.exports = { getAllExam, createExam }