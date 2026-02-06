import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema({
  message: String,
  date: { type: Date, default: Date.now }
});

export default mongoose.model("ActivityLog", activityLogSchema);
