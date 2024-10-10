import express from "express";
import {
  processPayment,
  getPaymentDetails,
  getPaymentsByPatient,
} from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/pay", protect, processPayment);
router.get("/getpay/:id", getPaymentDetails);
router.get("/getpayment/:patientId", getPaymentsByPatient);

export default router;
