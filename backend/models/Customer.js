import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  category: String, // Coaching, Real Estate, Fitness
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Customer", customerSchema);
