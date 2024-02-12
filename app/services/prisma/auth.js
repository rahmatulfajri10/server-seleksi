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
        select: {
            id: true,
            username: true,
            password: true,
            active: true,
            tbl_user_roles: {
                select: {
                    id_role: true,
                }
            }
        },
        
    });
    const modifiedUser = {
        id: user.id,
        username: user.username,
        active: user.active,
        role: user.tbl_user_roles.map(role => role.id_role)
    }
    
    if (!user) throw new NotFoundError("Invalid username or password");
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new NotFoundError("Invalid username or password");
    const token = createJWT(createTokenUser(modifiedUser));
    
    return token;
}

module.exports = {
    signin,
};  


