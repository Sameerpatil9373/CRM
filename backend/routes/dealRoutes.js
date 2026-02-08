import express from "express";
import {
  getDeals,
  addDeal,
  updateDealStage,
  updateDeal,
  deleteDeal
} from "../controllers/dealController.js";

const router = express.Router();

router.get("/", getDeals);
router.post("/", addDeal);
router.put("/:id", updateDeal);
router.put("/stage/:id", updateDealStage);
router.delete("/:id", deleteDeal);

export default router;
