const express = require('express');
const router = express();
const { index} = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');
const { extractUserInfo, logEvent } = require('../../../middlewares/log-event');

router.get('/tipe-soal', extractUserInfo, logEvent ,authenticateUser, index);
module.exports = router;