const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  userEmail: String,
  domain: String,
  timeSpent: Number,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Report", reportSchema);
