const Facture = require("../models/Facture");
const Fournisseur = require("../models/Fournisseur");

const createFacture = async (req, res) => {
  try {
    const { fournisseurId, amount, dueDate } = req.body;

    const fournisseur = await Fournisseur.findOne({_id: fournisseurId, user: req.user._id,});

    if (!fournisseur) {
      return res.status(404).json({message: "Fournisseur not found",});
    }

    const facture = await Facture.create({ fournisseur: fournisseurId, user: req.user._id, amount, dueDate,});

    res.status(201).json({message: "Facture created", facture,});

  } catch (error) {
    res.status(500).json({message: error.message,});
  }
};


const getFactures = async (req, res) => {
  try {
    const factures = await Facture.find({user: req.user._id,}).populate("fournisseur", "name");

    res.json(factures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateFacture = async (req, res) => {
  try {
    const facture = await Facture.findOne({_id: req.params.id, user: req.user._id,});

    if (!facture) {
      return res.status(404).json({ message: "Facture not found" });
    }

    if (facture.status === "paid") {
      return res.status(400).json({message: "Cannot update a paid facture",});
    }

    facture.amount = req.body.amount || facture.amount;
    facture.dueDate = req.body.dueDate || facture.dueDate;

    await facture.save();

    res.json({message: "Facture updated", facture,});

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteFacture = async (req, res) => {
  try {
    const facture = await Facture.findOne({_id: req.params.id, user: req.user._id,
    });

    if (!facture) {
      return res.status(404).json({ message: "Facture not found" });
    }

    if (facture.status !== "unpaid") {
      return res.status(400).json({message: "Cannot delete facture with payments",});
    }

    await facture.deleteOne();

    res.json({message: "Facture deleted",});

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
    createFacture,
    getFactures,
    updateFacture,
    deleteFacture,
};