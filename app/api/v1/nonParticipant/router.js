const express = require('express');
const router = express();
const { create,index } = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');


router.post('/nonparticipant',authenticateUser, create);
router.get('/nonparticipant',authenticateUser, index);


module.exports = router;