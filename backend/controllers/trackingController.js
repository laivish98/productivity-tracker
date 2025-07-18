import Tracking from "../models/Tracking.js";

export const trackTime = async (req, res) => {
  const { domain, timeSpent } = req.body;
  const today = new Date().setHours(0, 0, 0, 0);

  let record = await Tracking.findOne({ domain, date: today });
  if (record) {
    record.timeSpent += timeSpent;
    await record.save();
  } else {
    await Tracking.create({ domain, timeSpent, date: today });
  }

  res.sendStatus(200);
};

export const getTodayReport = async (req, res) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const records = await Tracking.find({ date: today });

  const report = {};
  records.forEach(record => {
    report[record.domain] = record.timeSpent;
  });

  res.json(report);
};
