const express = require('express');
const router = express();
const { create , index} = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');

router.get('/role',authenticateUser, index);
router.post('/role',authenticateUser, create);
module.exports = router;