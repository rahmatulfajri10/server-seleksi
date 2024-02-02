const express = require('express');
const router = express();
const { create,index } = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');
const upload = require("../../../middlewares/multer");


router.post('/participant',authenticateUser, upload.uploadMiddlewareParticipant.single('file'), create)
// router.post('/participant',authenticateUser, uploadMiddlewareParticipant.single('file'), create);
router.get('/participant',authenticateUser, index);



module.exports = router;