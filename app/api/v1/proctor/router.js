const express = require("express");
const router = express();
const { create } = require("./controller");
const { authenticateUser } = require("../../../middlewares/auth");
const { extractUserInfo, logEvent } = require("../../../middlewares/log-event");

router.post("/proctor", extractUserInfo, logEvent, authenticateUser, create);

module.exports = router;
