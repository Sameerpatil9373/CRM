import express from "express";
import { getCustomers, addCustomer, updateCustomer, deleteCustomer } from "../controllers/customerController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getCustomers);
router.post("/", auth, addCustomer);
router.put("/:id", auth, updateCustomer);
router.delete("/:id", auth, deleteCustomer);

export default router;
