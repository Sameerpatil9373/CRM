import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  customerName: String,
  category: { type: String, default: "Uncategorized" },
  amount: Number,
  status: String, // paid, pending, overdue
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Payment", paymentSchema);
