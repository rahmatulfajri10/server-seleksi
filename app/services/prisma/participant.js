const prisma = require('../../db/index')
const { BadRequestError } = require('../../errors')

const getAllParticipant = async () => {
    const result = await prisma.tbl_participant.findMany()
    return result
}

const createParticipant = async (req) => {
    const { username, nama, nik, no_pendaftaran } = req.body;
    const checkUsername = await prisma.tbl_user.findFirst({
        where: {
            username: username,
        },
    });
    if (!checkUsername) throw new BadRequestError('Username tersebut tidak ada di database');
    const check = await prisma.tbl_participant.findFirst({
        where: {
            username: username,
        },
    });
    console.log(req.file)
    if (!check) {
        const result = await prisma.tbl_participant.create({
            data: {
                username: username,
                nama: nama,
                nik: nik,
                no_pendaftaran: no_pendaftaran,
                url_foto: req.file
                ? `uploads/participant/${req.file.filename}`
                : "uploads/avatar/default.jpeg",
            },
            select: {
                id: true,
                username: true,
                nama: true,
                nik: true,
                no_pendaftaran: true,
                url_foto: true,
            },
        });
        return result;
    }else{
        throw new BadRequestError('Username tersebut sudah ada di database');
    }
    
}

module.exports = { getAllParticipant, createParticipant }