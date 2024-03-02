const express = require("express");
const router = express();
const { create, index, getone } = require("./controller");
const { authenticateUser } = require("../../../middlewares/auth");
const upload = require("../../../middlewares/multer");
const { extractUserInfo, logEvent } = require("../../../middlewares/log-event");

router.post(
  "/participant",
  extractUserInfo,
  logEvent,
  authenticateUser,
  upload.uploadMiddlewareParticipant.single("file"),
  create
);
router.get("/participant", extractUserInfo, logEvent, authenticateUser, index);
router.get(
  "/participant/:id",
  extractUserInfo,
  logEvent,
  authenticateUser,
  getone
);

module.exports = router;
