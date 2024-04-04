const express = require("express");
const router = express();
const { create, index, addRole, bulkInsertCSV } = require("./controller");
const { authenticateUser } = require("../../../middlewares/auth");
const { extractUserInfo, logEvent } = require("../../../middlewares/log-event");
const upload = require("../../../middlewares/multer");

router.post("/user", create);
router.get("/user", extractUserInfo, logEvent, authenticateUser, index);
router.post(
  "/user/add-role",
  extractUserInfo,
  logEvent,
  authenticateUser,
  addRole
);
router.post(
  "/user/bulkinsert-participant",
  extractUserInfo,
  logEvent,
  authenticateUser,
  upload.uploadMiddlewareAccountParticipant.single("file"),
  bulkInsertCSV
);

module.exports = router;
