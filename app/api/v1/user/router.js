const express = require('express');
const router = express();
const { create,index } = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');


router.post('/user',authenticateUser, create);
router.get('/user',authenticateUser, index);


module.exports = router;