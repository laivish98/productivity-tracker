const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  preferences: {
    blockedSites: [String],
    theme: { type: String, default: "default" },
  },
});

module.exports = mongoose.model("User", userSchema);
