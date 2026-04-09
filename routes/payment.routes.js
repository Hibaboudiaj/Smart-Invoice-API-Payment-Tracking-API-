const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth.middleware");
const { addPayment, getPayments } = require("../controllers/payment.controller");

// ADD a payment to a specific facture
router.post("/factures/:id/payments", protect, addPayment);

// GET all payments for a specific facture
router.get("/factures/:id/payments", protect, getPayments);

module.exports = router;