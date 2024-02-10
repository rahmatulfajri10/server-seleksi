const express = require('express');
const router = express()
const { signinCms, logout } = require('./controller');
const {  logEvent } = require('../../../middlewares/log-event');

router.post('/login',logEvent, signinCms)
router.post('/logout', logEvent, logout)

module.exports = router;    