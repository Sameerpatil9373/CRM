import mongoose from "mongoose";

const dealSchema = new mongoose.Schema({
  title: String,
  value: Number,

  stage: {
    type: String,
    enum: ["Lead", "Contacted", "Proposal", "Won", "Lost"],
    default: "Lead"
  },

  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Deal", dealSchema);
