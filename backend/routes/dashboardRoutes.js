import express from "express";
import Customer from "../models/Customer.js";
import Payment from "../models/Payment.js";
import Reminder from "../models/Reminder.js";
import Deal from "../models/Deal.js";

const router = express.Router();

const buildLastSixMonths = () => {
  const formatter = new Intl.DateTimeFormat("en", { month: "short" });
  const months = [];
  const now = new Date();

  for (let i = 5; i >= 0; i -= 1) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      key: `${d.getFullYear()}-${d.getMonth() + 1}`,
      month: formatter.format(d),
      revenue: 0,
    });
  }

  return months;
};

const paymentStatusAggregation = [
  {
    $group: {
      _id: null,
      totalRevenue: {
        $sum: {
          $cond: [{ $eq: [{ $toLower: "$status" }, "paid"] }, "$amount", 0],
        },
      },
      pendingCount: {
        $sum: {
          $cond: [{ $eq: [{ $toLower: "$status" }, "pending"] }, 1, 0],
        },
      },
      overdueCount: {
        $sum: {
          $cond: [{ $eq: [{ $toLower: "$status" }, "overdue"] }, 1, 0],
        },
      },
    },
  },
];

router.get("/stats", async (req, res) => {
  try {
    const customerCount = await Customer.countDocuments();
    const paymentStats = await Payment.aggregate(paymentStatusAggregation);
    const reminderCount = await Reminder.countDocuments();

    res.json({
      revenue: paymentStats[0]?.totalRevenue || 0,
      customers: customerCount,
      pending: paymentStats[0]?.pendingCount || 0,
      overdue: paymentStats[0]?.overdueCount || 0,
      reminders: reminderCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/overview", async (req, res) => {
  try {
    const [customerCount, reminderCount, paymentStats, categoryAgg, monthlyAgg, recentPayments, reminders] = await Promise.all([
      Customer.countDocuments(),
      Reminder.countDocuments(),
      Payment.aggregate(paymentStatusAggregation),
      Customer.aggregate([
        {
          $group: {
            _id: {
              $ifNull: [{ $trim: { input: "$category" } }, "Uncategorized"],
            },
            value: { $sum: 1 },
          },
        },
        { $project: { _id: 0, name: "$_id", value: 1 } },
        { $sort: { value: -1, name: 1 } },
      ]),
      Payment.aggregate([
        { $match: { $expr: { $eq: [{ $toLower: "$status" }, "paid"] } } },
        {
          $group: {
            _id: {
              year: { $year: "$date" },
              month: { $month: "$date" },
            },
            revenue: { $sum: "$amount" },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]),
      Payment.find().sort({ date: -1 }).limit(5).lean(),
      Reminder.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    const revenueData = buildLastSixMonths();
    const revenueMap = new Map(revenueData.map((m) => [m.key, m]));

    monthlyAgg.forEach((entry) => {
      const key = `${entry._id.year}-${entry._id.month}`;
      if (revenueMap.has(key)) {
        revenueMap.get(key).revenue = entry.revenue;
      }
    });

    res.json({
      stats: {
        revenue: paymentStats[0]?.totalRevenue || 0,
        customers: customerCount,
        pending: paymentStats[0]?.pendingCount || 0,
        overdue: paymentStats[0]?.overdueCount || 0,
        reminders: reminderCount,
      },
      revenueChart: revenueData.map(({ month, revenue }) => ({ month, revenue })),
      categoryChart: categoryAgg,
      recentPayments,
      reminders,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// DEAL ANALYTICS
router.get("/deal-stats", async (req, res) => {
  try {
    const deals = await Deal.find();

    let total = 0;
    let won = 0;
    let lost = 0;

    const stageMap = {
      Lead: 0,
      Contacted: 0,
      Proposal: 0,
      Won: 0,
      Lost: 0
    };

    deals.forEach(d => {
      total += d.value || 0;

      if (d.stage === "Won") won += d.value || 0;
      if (d.stage === "Lost") lost += d.value || 0;

      stageMap[d.stage] += d.value || 0;
    });

    res.json({
      total,
      won,
      lost,
      stageMap
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// KPI WIDGET DATA
router.get("/kpis", async (req, res) => {
  try {

    const totalCustomers = await Customer.countDocuments();
    const totalDeals = await Deal.countDocuments();

    const deals = await Deal.find();

    let pipelineValue = 0;
    let wonRevenue = 0;

    deals.forEach(d => {
      pipelineValue += d.value || 0;
      if (d.stage === "Won") {
        wonRevenue += d.value || 0;
      }
    });

    res.json({
      totalCustomers,
      totalDeals,
      pipelineValue,
      wonRevenue
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
