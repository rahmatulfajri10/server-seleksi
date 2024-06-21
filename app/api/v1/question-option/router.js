const express = require("express");
const router = express();
const { index, bulkInsertCSV, remove } = require("./controller");
const { authenticateUser } = require("../../../middlewares/auth");
const upload = require("../../../middlewares/multer");
const { extractUserInfo, logEvent } = require("../../../middlewares/log-event");

router.post(
  "/soal/:kd_soal",
  extractUserInfo,
  logEvent,
  authenticateUser,
  upload.uploadMiddlewareSoal.single("soal"),
  bulkInsertCSV
);
router.get(
  "/soal/:kd_soal",
  extractUserInfo,
  logEvent,
  authenticateUser,
  index
);

router.delete(
  "/soal/:kd_soal",
  extractUserInfo,
  logEvent,
  authenticateUser,
  remove
);

module.exports = router;
