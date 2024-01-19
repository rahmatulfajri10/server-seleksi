const prisma = require('../../db/index')
const { BadRequestError } = require('../../errors')

const getAllNonParticipant = async () => {
    const result = await prisma.tbl_nonparticipant.findMany()
    return result
}

const createNonParticipant = async (req) => {
    const { username, nama, ket_jabatan } = req.body;
    const checkUsername = await prisma.tbl_user.findFirst({
        where: {
            username: username,
        },
    });
    if (!checkUsername) throw new BadRequestError('Username tersebut tidak ada di database');
    const check = await prisma.tbl_nonparticipant.findFirst({
        where: {
            username: username,
        },
    });
    if (!check) {
        const result = await prisma.tbl_nonparticipant.create({
            data: {
                username: username,
                nama: nama,
                ket_jabatan: ket_jabatan,
            },
            select: {
                id: true,
                username: true,
                nama: true,
                ket_jabatan: true,
            },
        });
        return result;
    }else{
        throw new BadRequestError('Username tersebut sudah ada di database');
    }
    
}

module.exports = { getAllNonParticipant, createNonParticipant }