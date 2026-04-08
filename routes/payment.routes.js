const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth.middleware");

const {addPayment, getPayments,} = require("../controllers/payment.controller");

router.post("/factures/:id/payments", protect, addPayment);

router.get("/factures/:id/payments", protect, getPayments);

module.exports = router;