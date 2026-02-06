import Staff from "../models/Staff.js";

// GET staff (with pagination)
export const getStaff = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;

    const staff = await Staff.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Staff.countDocuments();

    res.json({ staff, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD staff
export const addStaff = async (req, res) => {
  try {
    const staff = new Staff(req.body);
    await staff.save();
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE staff
export const updateStaff = async (req, res) => {
  try {
    const updated = await Staff.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE staff
export const deleteStaff = async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);
    res.json({ message: "Staff deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
