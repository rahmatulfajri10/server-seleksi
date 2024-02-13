const jwt = require('jsonwebtoken');
const {
    jwtSecret,
} = require('../config');
const prisma = require('../db/index');
const { isTokenValid } = require('../utils');
const { UnauthenticatedError } = require('../errors');

const extractUserInfo = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        throw new UnauthenticatedError('Authentication invalid');
    }
    if (token)  {
        isTokenValid({token})
    }
    if (token) {
        try {
            
            // Verifikasi token dan dapatkan payload
            const decoded = jwt.verify(token, jwtSecret); // Ganti 'secret-key' dengan kunci rahasia JWT Anda
            // Disimpan dalam objek user dalam req untuk digunakan di middleware selanjutnya
            req.user = decoded;
        } catch (error) {
            // Tangani kesalahan jika token tidak valid
            console.error('Error verifying JWT token:', error.message);
        }
    }

    next();
};

const logEvent = async (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        
        
        // Ambil informasi pengguna dari objek req
        const username  = req.body.username ? req.body.username : req?.user?.username;
        const eventType = req.ip + ' ' + req.method + ' ' + req.originalUrl;
        await prisma.tbl_log.create({
            data: {
                username: username,
                log_event: eventType, // Misalnya, gunakan metode HTTP sebagai tindakan log
                // Tambahkan kolom lain sesuai kebutuhan
            }
        });

        next();
    } catch (error) {
        
        next(error);
    }
};

module.exports = {
    extractUserInfo,
    logEvent,
};
