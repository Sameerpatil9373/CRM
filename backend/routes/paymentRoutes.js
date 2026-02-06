import express from "express";
import { getPayments, addPayment, updatePayment, deletePayment } from "../controllers/paymentController.js";

const router = express.Router();

router.get("/", getPayments);
router.post("/", addPayment);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);

export default router;
