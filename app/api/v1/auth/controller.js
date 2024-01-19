const { signin } = require('../../../services/prisma/auth')
const { StatusCodes } = require('http-status-codes');

const signinCms = async (req, res, next) => {
    try {
        const token = await signin(req);
        res.status(StatusCodes.OK).json({
            status: 'success',
            data: token,
        });
    } catch (err) {
        next(err);
    }
}

const logout = async (req, res, next) => {
    try {
        res.clearCookie('token').status(StatusCodes.OK).json({
            status: 'success',
            message: 'logout successfully',
        });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: 'error',
            message: err.message,
        });
    }
}

module.exports = {
    signinCms,
    logout
};
