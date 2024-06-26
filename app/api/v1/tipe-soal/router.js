const express = require("express");
const router = express();
const { index, create } = require("./controller");
const { authenticateUser } = require("../../../middlewares/auth");
const { extractUserInfo, logEvent } = require("../../../middlewares/log-event");

router.get("/tipe-soal", extractUserInfo, logEvent, authenticateUser, index);
router.post("/tipe-soal", extractUserInfo, logEvent, authenticateUser, create);
module.exports = router;
