import express from "express";
import Customer from "../models/Customer.js";
import Payment from "../models/Payment.js";
import Reminder from "../models/Reminder.js";

const router = express.Router();

/*
 GET /api/dashboard/stats
 Returns:
 {
   revenue,
   customers,
   pending,
   reminders
 }
*/
router.get("/stats", async (req, res) => {
  try {
    // Count customers
    const customerCount = await Customer.countDocuments();

    // Aggregate payments
    const paymentStats = await Payment.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" },
          pendingCount: {
            $sum: {
              $cond: [{ $eq: ["$status", "pending"] }, 1, 0]
            }
          }
        }
      }
    ]);

    // Count reminders
    const reminderCount = await Reminder.countDocuments();

    res.json({
      revenue: paymentStats[0]?.totalRevenue || 0,
      customers: customerCount,
      pending: paymentStats[0]?.pendingCount || 0,
      reminders: reminderCount
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
