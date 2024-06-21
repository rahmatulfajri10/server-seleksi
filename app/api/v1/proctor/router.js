const express = require("express");
const router = express();
const { create, getProctorData } = require("./controller");
const { authenticateUser } = require("../../../middlewares/auth");
const { extractUserInfo, logEvent } = require("../../../middlewares/log-event");

router.post("/proctor", extractUserInfo, logEvent, authenticateUser, create);
router.get(
  "/proctor",
  extractUserInfo,
  logEvent,
  authenticateUser,
  getProctorData
);

module.exports = router;
