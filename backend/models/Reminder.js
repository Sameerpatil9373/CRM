import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: String },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Reminder", reminderSchema);
