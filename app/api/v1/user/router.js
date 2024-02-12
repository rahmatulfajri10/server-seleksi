const express = require('express');
const router = express();
const { create,index, addRole } = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');
const { extractUserInfo, logEvent } = require('../../../middlewares/log-event');


router.post('/user', extractUserInfo, logEvent,authenticateUser, create);
router.get('/user', extractUserInfo, logEvent,authenticateUser, index);
router.post('/user/add-role', extractUserInfo, logEvent,authenticateUser, addRole);


module.exports = router;