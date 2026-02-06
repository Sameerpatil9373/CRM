import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String, // Admin, Manager, Staff
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Staff", staffSchema);
