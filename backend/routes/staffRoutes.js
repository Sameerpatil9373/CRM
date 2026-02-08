import express from "express";
import Customer from "../models/Customer.js";
import Deal from "../models/Deal.js";
import Payment from "../models/Payment.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const q = req.query.q || "";

  try {
    const customers = await Customer.find({
      name: { $regex: q, $options: "i" }
    }).limit(5);

    const deals = await Deal.find({
      title: { $regex: q, $options: "i" }
    }).limit(5);

    const payments = await Payment.find({
      customerName: { $regex: q, $options: "i" }
    }).limit(5);

    res.json({ customers, deals, payments });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
