const Facture = require("../models/Facture");
const Payment = require("../models/Payment");
//resultat dyl factures et paiements 
const getDashboard = async (req, res) => {
  try {
    //njibo les factures dyl wa7ed l user
    const factures = await Facture.find({user: req.user._id,});

    //n7sbo che7al mn facture 3ando
    const totalFactures = factures.length;

    //n7sbo total amount dyl les factures
    //.reduce: katjm3 elm dyl table f 9ima 1
    const totalAmount = factures.reduce((sum, f) => 
      //sum l9dim + aount dyl fac
      sum + f.amount, 0);

    //njibo payments kamlin li dareha l user
    const payments = await Payment.find({user: req.user._id,});

    //n7sbo total dyl amount kaml li tkhals
    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);

    const now = new Date();

    //nl9aw les facture li tarikheha fat o mzl matkhalsat
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