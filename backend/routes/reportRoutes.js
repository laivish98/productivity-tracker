const express = require("express");
const router = express.Router();
const { logTime, getTodayReport } = require("../controllers/reportController");

router.post("/track", logTime);
router.get("/report/today", getTodayReport);

module.exports = router;
