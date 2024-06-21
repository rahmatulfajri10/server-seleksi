const express = require("express");
const router = express();
const {
  create,
  index,
  remove,
  updateStatus,
  update,
  count,
} = require("./controller");
const { authenticateUser } = require("../../../middlewares/auth");
const { extractUserInfo, logEvent } = require("../../../middlewares/log-event");

router.post("/exam", extractUserInfo, logEvent, authenticateUser, create);
router.get("/exam", extractUserInfo, logEvent, authenticateUser, index);
router.get("/exam/count", extractUserInfo, logEvent, authenticateUser, count);
router.delete(
  "/delete-exam/:kd_soal",
  extractUserInfo,
  logEvent,
  authenticateUser,
  remove
);
router.patch(
  "/exam/status/:kd_soal",
  extractUserInfo,
  logEvent,
  authenticateUser,
  updateStatus
);
router.patch(
  "/exam/update/:id",
  extractUserInfo,
  logEvent,
  authenticateUser,
  update
);

module.exports = router;
