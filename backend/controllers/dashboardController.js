import Payment from "../models/Payment.js";
import Customer from "../models/Customer.js";

export const getDashboardStats = async (req, res) => {
  try {
    const payments = await Payment.find();
    const customers = await Customer.find();

    // Total Revenue
    const totalRevenue = payments
      .filter(p => p.status === "paid")
      .reduce((sum, p) => sum + p.amount, 0);

    // Pending Payments
    const pendingPayments = payments.filter(p => p.status === "pending").length;

    // Customers Count
    const totalCustomers = customers.length;

    // Revenue Chart (group by month)
    const revenueChart = [
      { month: "Jan", revenue: 4000 },
      { month: "Feb", revenue: 3000 },
      { month: "Mar", revenue: 5000 },
      { month: "Apr", revenue: 4500 },
      { month: "May", revenue: 6000 },
      { month: "Jun", revenue: 7000 },
    ];

    // Category Chart
    const categoryChart = [
      { name: "Coaching", value: customers.filter(c=>c.category==="Coaching").length },
      { name: "Real Estate", value: customers.filter(c=>c.category==="Real Estate").length },
      { name: "Fitness", value: customers.filter(c=>c.category==="Fitness").length },
    ];

    // Recent Payments
    const recentPayments = await Payment.find().sort({date:-1}).limit(5);

    // Reminders (mock for now)
    const reminders = [
      { name:"Sarah Johnson", text:"Follow up", time:"Jan 22 10:00 AM" },
      { name:"Mike Wilson", text:"Payment overdue", time:"Jan 20 2:00 PM" },
    ];

    res.json({
      totalRevenue,
      totalCustomers,
      pendingPayments,
      revenueChart,
      categoryChart,
      recentPayments,
      reminders
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
