const express = require('express');
const router = express();
const { create,index } = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');
const { extractUserInfo, logEvent } = require('../../../middlewares/log-event');


router.post('/answer', extractUserInfo, logEvent,authenticateUser, create)
router.get('/answer', extractUserInfo, logEvent,authenticateUser, index);



module.exports = router;