const Facture = require("../models/Facture");
const Fournisseur = require("../models/Fournisseur");

const createFacture = async (req, res) => {
  try {
    const { fournisseurId, amount, dueDate } = req.body;

    const fournisseur = await Fournisseur.findOne
    //l user li tab3 l dak fornisseur 
    //id: fournisseurId
    //→ l fournisseur li _id dialo howa had l'identifiant (li jabna mn req.params.id)
    //→ o taykon had l fournisseur tabe3 had l'utilisateur li dakhil (req.user._id)
    ({_id:fournisseurId, user: req.user._id,});

    if (!fournisseur) {
      return res.status(404).json({message: "Fournisseur not found",});
    }

    //dueDate: date dyl lkhelas
    const facture = await Facture.create({ fournisseur: fournisseurId, user: req.user._id, amount, dueDate,});

    res.status(201).json({message: "Facture created", facture,});

  } catch (error) {
    res.status(500).json({message: error.message,});
  }
};


const getFactures = async (req, res) => {
  try {
    //{user: req.user._id,}: lfacture li user dylha howa <-- 
    //kol user ychof li lih
    //.find return array
    const factures = await Facture.find({user: req.user._id,})
    .populate("fournisseur", "name");
    //kat7aded cheno yjib
    res.json(factures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getFacture = async (req, res) => {
  try {
    const facture = await Facture.findOne({
      _id: req.params.id,//id dylha ykon jay mn rabit
      user: req.user._id,//user dylha ykon howa user li dayr login
    }).populate("fournisseur", "name");

    if (!facture) {
      return res.status(404).json({message: "Facture not found",});
    }

    res.json(facture);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateFacture = async (req, res) => {
  try {
    //id dyl factire 
    const facture = await Facture.findOne({_id: req.params.id, user: req.user._id,});

    if (!facture) {
      return res.status(404).json({ message: "Facture not found" });
    }
    //.status: 7ala dyl facture
    if (facture.status === "paid") {
      return res.status(400).json({message: "Cannot update a paid facture",});
    }

    //7at f amount ila ja update mn body majach 7afed 3la li kan
    facture.amount = req.body.amount || facture.amount;
    facture.dueDate = req.body.dueDate || facture.dueDate; 

    //bdl chnge ta mn db
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

const getLastPayments = async (req,res)=>{
const facture = factures.find()
if (facture._id) {
  return  res.status(404).json
}

}


module.exports = {
    createFacture,
    getFactures,
    getFacture,
    updateFacture,
    deleteFacture,
    getLastPayments,
};