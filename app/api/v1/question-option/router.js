const express = require('express');
const router = express();
const { index, bulkInsertCSV } = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');
const upload = require("../../../middlewares/multer");
const { extractUserInfo, logEvent } = require('../../../middlewares/log-event');


router.post('/soal', extractUserInfo, logEvent,authenticateUser, upload.uploadMiddlewareSoal.single('soal'), bulkInsertCSV)
router.get('/soal', extractUserInfo, logEvent,authenticateUser, index);



module.exports = router;