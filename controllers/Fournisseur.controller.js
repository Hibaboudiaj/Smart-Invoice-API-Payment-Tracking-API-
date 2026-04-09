const Fournisseur = require("../models/Fournisseur");
const Facture = require("../models/Facture");
const Payment = require("../models/Payment");

const createFournisseur = async (req, res) => {
  try {
    const { name, contact } = req.body;

    if (!name || !contact) {
      return res.status(400).json({ message: "Name and contact are required" });
    }

    const fournisseur = await Fournisseur.create({
      name,
      contact,
      user: req.user._id,
    });

    res.status(201).json({ message: "Fournisseur Created", fournisseur });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFournisseurs = async (req, res) => {
  try {
    const fournisseurs = await Fournisseur.find({ user: req.user._id });
    res.json(fournisseurs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getFournisseur = async (req, res) => {
  try {
    const fournisseur = await Fournisseur.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!fournisseur) {
      return res.status(404).json({ message: "Fournisseur not found" });
    }

    res.json(fournisseur);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateFournisseur = async (req, res) => {
  try {
    const fournisseur = await Fournisseur.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!fournisseur) {
      return res.status(404).json({ message: "Fournisseur not found" });
    }

    res.json(fournisseur);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteFournisseur = async (req, res) => {
  try {
    const fournisseur = await Fournisseur.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!fournisseur) {
      return res.status(404).json({ message: "Fournisseur not found" });
    }

    res.json({ message: "Fournisseur deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getFournisseurStats = async (req, res) => {
  try {
    const fournisseurId = req.params.id;

    const factures = await Facture.find({
      supplier: fournisseurId,
      user: req.user._id,
    });

    const totalFactures = factures.length;

    const totalAmount = factures.reduce((sum, f) => sum + f.amount, 0);

    const factureIds = factures.map((f) => f._id);
    const payments = await Payment.find({ facture: { $in: factureIds } });

    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);

    const remaining = totalAmount - totalPaid;

    res.json({
      totalFactures,
      totalAmount,
      totalPaid,
      remaining,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createFournisseur,
  getFournisseurs,
  getFournisseur,
  updateFournisseur,
  deleteFournisseur,
  getFournisseurStats,
};