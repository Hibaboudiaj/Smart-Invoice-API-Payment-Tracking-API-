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
    const fournisseurs = await Fournisseur.find({ user: req.user._id });//condition
    res.json(fournisseurs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getFournisseur = async (req, res) => {
  try {
    const fournisseur = await Fournisseur.findOne({
      _id: req.params.id,
      user: req.user._id,//user deja login
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
      req.body,//data jdida
      { new: true }//katraj3 noskha jdida
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

//yani: "jbed lia les statistiques dyal fournisseur"
const getFournisseurStats = async (req, res) => {
  try {
    //1. katakhed ID dyal fournisseur mn URL
    const fournisseurId = req.params.id;

    //get all facture de had for..r
    const factures = await Facture.find({
      supplier: fournisseurId,//get factures tab3a l forniseer spisifi
      user: req.user._id,//dyl had user
    });

    //kan7sbo che7al dyl les facture 3ando
    const totalFactures = factures.length;

    //bach n7sbo total dyl amount dyl kol fatora
    //.reduce method katdmj elms dyl array f 9ima 1
    //kayjm3 montant dyl les facture katzad kol facture ;ontant dylha l sum
    const totalAmount = factures.reduce((sum, f) => sum + f.amount, 0);

    //kankharjo id dyl kol facture o kanjm3hom f table factureIds
    const factureIds = factures.map((f) => f._id);

    //kanjbd paiments li fac dylhom f liste factureIds
    //$in hiya condition f MongoDB ya'ni 'kayn f liste' oula 'f tableau'
    const payments = await Payment.find({ facture:{$in: factureIds}});

    //had chi calcul kayjme3 lik l'montant total dyal les paiements li lqina
    //(sum, p) => sum + p.amount → kol mara katzid sum + montant dyal had l'paiement
    //kat7sb montaant dyl les paiments
    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);

    //had chi calcul kaykhrej lik l'montant li bqai (li ma tkhlassch)
    const remaining = totalAmount - totalPaid;

    //katraj3 res json objet fih ..
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