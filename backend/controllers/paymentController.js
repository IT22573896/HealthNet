import asyncHandler from "express-async-handler";
import Payment from "../models/paymentModel.js"; // Import Payment model

// @desc    Process Payment
// @route   POST /api/payments/pay
// @access  Private
const processPayment = asyncHandler(async (req, res) => {
  const { amount, method, cardDetails, insuranceDetails } = req.body;

  // Validate fields
  if (!amount || !method) {
    res.status(400);
    throw new Error("Amount and payment method are required");
  }

  let paymentStatus = "Pending";

  if (method === "card") {
    if (
      !cardDetails ||
      !cardDetails.cardNumber ||
      !cardDetails.expiry ||
      !cardDetails.cvc
    ) {
      res.status(400);
      throw new Error("Card details are required for card payment");
    }
    // Simulate card payment processing
    paymentStatus = "Paid";
  } else if (method === "cash") {
    paymentStatus = "Pending Cash";
  } else if (method === "insurance") {
    if (
      !insuranceDetails ||
      !insuranceDetails.policyNumber ||
      !insuranceDetails.provider
    ) {
      res.status(400);
      throw new Error("Insurance details are required for insurance claim");
    }
    paymentStatus = "Pending Insurance";
  } else {
    res.status(400);
    throw new Error("Invalid payment method");
  }

  // Save the payment record
  const payment = await Payment.create({
    user: req.user._id,
    amount,
    method,
    status: paymentStatus,
    cardDetails: method === "card" ? cardDetails : null,
    insuranceDetails: method === "insurance" ? insuranceDetails : null,
  });

  if (payment) {
    res.status(201).json({
      paymentId: payment._id,
      amount: payment.amount,
      method: payment.method,
      status: payment.status,
    });
  } else {
    res.status(400);
    throw new Error("Payment processing failed");
  }
});

// @desc    Get Payment Details by ID
// @route   GET /api/payments/getpay/:id
// @access  Private
const getPaymentDetails = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);

  if (payment) {
    res.json(payment);
  } else {
    res.status(404);
    throw new Error("Payment not found");
  }
});

export { processPayment, getPaymentDetails };
