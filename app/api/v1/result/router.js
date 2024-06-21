const express = require("express");
const router = express();
const { create, index, count } = require("./controller");
const { authenticateUser } = require("../../../middlewares/auth");
const { extractUserInfo, logEvent } = require("../../../middlewares/log-event");

router.get("/result", extractUserInfo, logEvent, authenticateUser, index);
router.get("/result/count", extractUserInfo, logEvent, authenticateUser, count);
router.post("/result", extractUserInfo, logEvent, authenticateUser, create);
module.exports = router;
