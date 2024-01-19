const { hash } = require("bcryptjs");
const prisma = require("../../db");
const { BadRequestError, NotFoundError } = require("../../errors");

const createUser = async (req) => {
    const { username, password, confirmPassword, ur_role } = req.body;
    if (password !== confirmPassword) throw new BadRequestError('Password tidak sama');
    const check = await prisma.tbl_user.findFirst({
        where: {
            username: username,
        },
    });
    if (check) throw new BadRequestError('Username sudah digunakan');
    const hashedPassword = await hash(password, 12);
    const role = await prisma.tbl_role.findFirst({
        where: {
            ur_role: ur_role,
        },
        select: {
            kd_role: true,
        },
    });
    if (!role) throw new NotFoundError('Role tidak ditemukan');
    const result = await prisma.tbl_user.create({
        data: {
            username: username,
            password: hashedPassword,
            kd_role: role.kd_role,
        },
        select: {
            username: true,
            kd_role: true,
        },
    });
    return result;
}

const getAllUser = async () => {
    const result = await prisma.tbl_user.findMany({
        select: {
            username: true,
            kd_role: true,
        },
    });
    return result;
}

module.exports = {
    createUser,
    getAllUser,
};