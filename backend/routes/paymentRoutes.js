import express from "express";
import {
  processPayment,
  getPaymentDetails,
} from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/pay", protect, processPayment); // Payment processing endpoint
router.get("/getpay/:id", protect, getPaymentDetails); // Get payment details by ID

export default router;
