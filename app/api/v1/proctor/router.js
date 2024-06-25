const express = require("express");
const router = express();
const { create, getProctorData, getProctorbyId } = require("./controller");
const { authenticateUser } = require("../../../middlewares/auth");
const { extractUserInfo, logEvent } = require("../../../middlewares/log-event");

router.post("/proctor", extractUserInfo, logEvent, authenticateUser, create);
router.get(
  "/proctor/:id_user",
  extractUserInfo,
  logEvent,
  authenticateUser,
  getProctorbyId
);
router.get(
  "/proctor",
  extractUserInfo,
  logEvent,
  authenticateUser,
  getProctorData
);

module.exports = router;
