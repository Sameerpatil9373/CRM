import Payment from "../models/Payment.js";

// GET payments (Filter by status + Pagination)
export const getPayments = async (req, res) => {
  try {
    const { status = "", page = 1, limit = 5 } = req.query;

    const query = status ? { status } : {};

    const payments = await Payment.find(query)
      .skip((page - 1) * limit)
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
    const payment = new Payment(req.body);
    await payment.save();
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE payment
export const updatePayment = async (req, res) => {
  try {
    const updated = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
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
