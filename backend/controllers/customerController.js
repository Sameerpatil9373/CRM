import Customer from "../models/Customer.js";

// GET customers (Search + Pagination)
export const getCustomers = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 5 } = req.query;

    const query = {
      name: { $regex: search, $options: "i" }
    };

    const customers = await Customer.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Customer.countDocuments(query);

    res.json({ customers, total });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD customer
export const addCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE customer
export const updateCustomer = async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE customer
export const deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: "Customer deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
