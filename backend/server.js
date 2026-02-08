import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import customerRoutes from "./routes/customerRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import reminderRoutes from "./routes/reminderRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import dealRoutes from "./routes/dealRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CRM Backend API Running");
});

app.use("/api/customers", customerRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/deals", dealRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
