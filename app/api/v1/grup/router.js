const express = require("express");
const router = express();
const { create, index } = require("./controller");
const { authenticateUser } = require("../../../middlewares/auth");
const { extractUserInfo, logEvent } = require("../../../middlewares/log-event");

router.get("/grup", extractUserInfo, logEvent, authenticateUser, index);
router.post("/grup", extractUserInfo, logEvent, authenticateUser, create);
module.exports = router;
