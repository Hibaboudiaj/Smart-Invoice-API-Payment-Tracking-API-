const Payment = require("../models/Payment");
const Facture = require("../models/Facture");

const addPayment = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Amount must be positive" });
    }

    const facture = await Facture.findOne({ _id: req.params.id, user: req.user._id });
    if (!facture) {
      return res.status(404).json({ message: "Facture not found" });
    }

    const payments = await Payment.find({ facture: facture._id });
    const totalPaid = payments.reduce((acc, p) => acc + p.amount, 0);

    if (totalPaid + amount > facture.amount) {
      return res.status(400).json({ message: "Payment exceeds facture amount" });
    }

    const payment = await Payment.create({
      facture: facture._id,
      user: req.user._id,
      amount,
    });

    const newTotal = totalPaid + amount;
    if (newTotal === facture.amount) {
      facture.status = "paid";
    } else if (newTotal > 0) {
      facture.status = "partially_paid";
    }
    await facture.save();

    res.status(201).json({ message: "Payment added", payment, status: facture.status });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ facture: req.params.id, user: req.user._id });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addPayment,
  getPayments,
};