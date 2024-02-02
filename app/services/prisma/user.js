const { hash } = require("bcryptjs");
const prisma = require("../../db");
const { BadRequestError, NotFoundError } = require("../../errors");

const createUser = async (req) => {
    const { username, password, confirmPassword } = req.body;
    if (password !== confirmPassword) throw new BadRequestError('Password tidak sama');
    const check = await prisma.tbl_user.findFirst({
        where: {
            username: username,
        },
    });
    if (check) throw new BadRequestError('Username sudah digunakan');
    const hashedPassword = await hash(password, 12);
    const result = await prisma.tbl_user.create({
        data: {
            username: username,
            password: hashedPassword,
        },
        select: {
            username: true,
            active: true
        },
    });
    return result;
}

const getAllUser = async () => {
    const result = await prisma.tbl_user.findMany({
        select: {
            username: true,
            active: true
        },
    });
    return result;
}

module.exports = {
    createUser,
    getAllUser,
};