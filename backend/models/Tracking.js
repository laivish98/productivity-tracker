import mongoose from "mongoose";

const trackingSchema = new mongoose.Schema({
  domain: String,
  timeSpent: Number,
  date: Date
});

export default mongoose.model("Tracking", trackingSchema);
