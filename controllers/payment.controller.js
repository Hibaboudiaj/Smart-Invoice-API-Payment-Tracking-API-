const Payment = require("../models/Payment");
const Facture = require("../models/Facture");

const addPayment = async (req, res) => {
  try {
    //njbdo amount mn req
    const { amount } = req.body;

    //check wach amount positive
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Amount must be positive" });
    }
    //n9albo 33la l facture wach kaina 
    const facture = await Facture.findOne({ _id: req.params.id, user: req.user._id });
    if (!facture) {
      return res.status(404).json({ message: "Facture not found" });
    }
    
    //njibo pay li mt3al9in b had facture b id dylhom
    const payments = await Payment.find({ facture: facture._id });
    //9alb 3la ga3 pay khodhon o zidhom 3la total final 3tini chehal tkhales ..kay7sb dok payments
    //bda mn 0 kol mara khod acc(lmjmo3 l9dim) zid liya p.amount(l'montant dyal had l'paiement) 3lih"
    const totalPaid = payments.reduce((acc, p) => 
      acc + p.amount, 0);

    //check amount li bghit tdf3 maykonch kbar mn amount dyl fac
    if (totalPaid + amount > facture.amount) {
      return res.status(400).json({ message: "Payment exceeds facture amount" });
    }

    //kayzid pay kay7aded chekon df3 w che7al 
    const payment = await Payment.create({
      facture: facture._id,
      user: req.user._id,
      amount,
    });

    //status dyl fac che7al tkhals mnha
    const newTotal = totalPaid + amount;
    //7sb total jdid : li tkhlas 9bl + li tkhals db
    if (newTotal === facture.amount) {
      //ila kan total = meme total de fac paid
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