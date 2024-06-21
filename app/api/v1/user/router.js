const express = require("express");
const router = express();
const {
  create,
  index,
  addRole,
  bulkInsertCSV,
  delRole,
  remove,
  updateStatus,
  count,
} = require("./controller");
const { authenticateUser } = require("../../../middlewares/auth");
const { extractUserInfo, logEvent } = require("../../../middlewares/log-event");
const upload = require("../../../middlewares/multer");

//User
router.get("/user/count", extractUserInfo, logEvent, authenticateUser, count);
router.post("/user", extractUserInfo, logEvent, authenticateUser, create);
router.get("/user", extractUserInfo, logEvent, authenticateUser, index);
router.delete("/user/:id", extractUserInfo, logEvent, authenticateUser, remove);

//Update Status User
router.patch(
  "/user/status/:id",
  extractUserInfo,
  logEvent,
  authenticateUser,
  updateStatus
);

//Add Delete Role
router.post(
  "/user/add-role/:id",
  extractUserInfo,
  logEvent,
  authenticateUser,
  addRole
);
router.delete(
  "/user/del-role/:id",
  extractUserInfo,
  logEvent,
  authenticateUser,
  delRole
);

//Bulk Insert Participant
router.post(
  "/user/bulkinsert-participant",
  extractUserInfo,
  logEvent,
  authenticateUser,
  upload.uploadMiddlewareAccountParticipant.single("file"),
  bulkInsertCSV
);

module.exports = router;
