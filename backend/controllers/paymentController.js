import Payment from "../models/Payment.js";

const normalizeStatus = (status = "pending") => String(status).toLowerCase().trim();

// GET payments (Filter by status/category + Pagination)
export const getPayments = async (req, res) => {
  try {
    const { status = "", category = "", page = 1, limit = 5 } = req.query;

    const query = {};
    if (status) query.status = normalizeStatus(status);
    if (category) query.category = category;

    const payments = await Payment.find(query)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ date: -1 });

    const total = await Payment.countDocuments(query);

    res.json({ payments, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD payment
export const addPayment = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      status: normalizeStatus(req.body.status),
      category: req.body.category || "Uncategorized",
    };

    const payment = new Payment(payload);
    await payment.save();
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE payment
export const updatePayment = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      status: normalizeStatus(req.body.status),
      category: req.body.category || "Uncategorized",
    };

    const updated = await Payment.findByIdAndUpdate(req.params.id, payload, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE payment
export const deletePayment = async (req, res) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);
    res.json({ message: "Payment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
