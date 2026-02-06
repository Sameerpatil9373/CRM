import express from "express";
import Customer from "../models/Customer.js";
import Payment from "../models/Payment.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const q = req.query.q;

  if (!q) return res.json([]);

  try {
    const customers = await Customer.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
      ],
    }).limit(5);

    const payments = await Payment.find({
      reference: { $regex: q, $options: "i" },
    }).limit(5);

    res.json({ customers, payments });

  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
