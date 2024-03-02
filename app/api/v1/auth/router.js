const express = require("express");
const router = express();
const { signinCms, logout, me } = require("./controller");
const { logEvent, extractUserInfo } = require("../../../middlewares/log-event");

router.post("/login", logEvent, signinCms);
router.post("/logout", logout);
router.post("/me", extractUserInfo, logEvent, me);

module.exports = router;
