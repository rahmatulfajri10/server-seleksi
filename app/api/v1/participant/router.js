const express = require('express');
const router = express();
const { create,index } = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');
const { uploadMiddlewareParticipant } = require('../../../middlewares/multer');


router.post('/participant',authenticateUser, uploadMiddlewareParticipant.single('foto'), create);
router.get('/participant',authenticateUser, index);


module.exports = router;