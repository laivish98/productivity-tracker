const User = require("../models/User");

exports.getPreferences = async (req, res) => {
  const { email } = req.query;
  const user = await User.findOne({ email });
  res.json(user?.preferences || {});
};

exports.updatePreferences = async (req, res) => {
  const { email, preferences } = req.body;
  const user = await User.findOneAndUpdate(
    { email },
    { preferences },
    { new: true, upsert: true }
  );
  res.json(user.preferences);
};
