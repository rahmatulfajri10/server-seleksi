const prisma = require("../../db");
const { BadRequestError, NotFoundError } = require("../../errors");
const { createTokenUser, createJWT } = require("../../utils")
const bcrypt = require("bcryptjs");

const signin = async (req) => {
    const { username, password } = req.body;
    if (!username || !password) throw new BadRequestError("Username dan password harus diisi");
    const user = await prisma.tbl_user.findFirst({
        where: {
            username: username,
        },
    });
    if (!user) throw new NotFoundError("Invalid username or password");
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new NotFoundError("Invalid username or password");
    const token = createJWT(createTokenUser(user));
    return token;
}

module.exports = {
    signin,
};  


