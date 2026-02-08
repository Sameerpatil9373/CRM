import Deal from "../models/Deal.js";
import ActivityLog from "../models/ActivityLog.js";

// GET DEALS
export const getDeals = async (req, res) => {
  const deals = await Deal.find().populate("customer");
  res.json(deals);
};

// ADD DEAL
export const addDeal = async (req, res) => {
  try {
    const deal = new Deal(req.body);
    await deal.save();

    // 🔥 AUTO LOG
    await ActivityLog.create({
  message: `Created deal "${deal.title}"`,
  date: new Date()
});


    res.json(deal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE STAGE
export const updateDealStage = async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id);

    const oldStage = deal.stage;
    deal.stage = req.body.stage;
    await deal.save();

    // 🔥 AUTO LOG
     await ActivityLog.create({
  message: `Moved "${deal.title}" from ${oldStage} to ${deal.stage}`,
  date: new Date()
});

    res.json(deal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// UPDATE DEAL
export const updateDeal = async (req, res) => {
  try {
    const updated = await Deal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    await ActivityLog.create({
      message: `Updated deal "${updated.title}"`,
      date: new Date()
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE DEAL
export const deleteDeal = async (req, res) => {
  try {
    const deal = await Deal.findByIdAndDelete(req.params.id);

    await ActivityLog.create({
      message: `Deleted deal "${deal.title}"`,
      date: new Date()
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
