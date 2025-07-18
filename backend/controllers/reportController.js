const Report = require("../models/Report");

exports.logTime = async (req, res) => {
  const { userEmail, domain, timeSpent } = req.body;
  try {
    const entry = new Report({ userEmail, domain, timeSpent });
    await entry.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTodayReport = async (req, res) => {
  const { userEmail } = req.query;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const reports = await Report.find({
      userEmail,
      timestamp: { $gte: today }
    });

    const result = {};
    reports.forEach(({ domain, timeSpent }) => {
      result[domain] = (result[domain] || 0) + timeSpent;
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
