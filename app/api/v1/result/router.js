const express = require("express");
const router = express();
const { create, index, count, indexOne, getP } = require("./controller");
const { authenticateUser } = require("../../../middlewares/auth");
const { extractUserInfo, logEvent } = require("../../../middlewares/log-event");

router.get("/result/count", extractUserInfo, logEvent, authenticateUser, count);
router.get(
  "/result/participant/:id_user",
  extractUserInfo,
  logEvent,
  authenticateUser,
  getP
);

router.get("/result", extractUserInfo, logEvent, authenticateUser, index);
router.get(
  "/result/:kd_soal",
  extractUserInfo,
  logEvent,
  authenticateUser,
  indexOne
);
router.post("/result", extractUserInfo, logEvent, authenticateUser, create);
module.exports = router;
