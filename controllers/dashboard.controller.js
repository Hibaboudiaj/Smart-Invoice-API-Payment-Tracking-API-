const Facture = require("../models/Facture");
const Payment = require("../models/Payment");

const getDashboard = async (req, res) => {
  try {
    const factures = await Facture.find({user: req.user._id,});

    const totalFactures = factures.length;

    const totalAmount = factures.reduce((sum, f) => sum + f.amount, 0);

    const payments = await Payment.find({user: req.user._id,});

    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);

    const now = new Date();

    const lateFactures = factures.filter((f) => f.dueDate < now && f.status !== "paid");

    res.json({
      totalFactures,
      totalAmount,
      totalPaid,
      lateFactures: lateFactures.length,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboard,
};