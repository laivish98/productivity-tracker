const express = require("express");
const router = express.Router();
const { getPreferences, updatePreferences } = require("../controllers/userController");

router.get("/preferences", getPreferences);
router.post("/preferences", updatePreferences);

module.exports = router;
