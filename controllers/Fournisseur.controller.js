const Fournisseur = require("../models/Fournisseur");
const Fournisseur = require("../models/Fournisseur");
const Fournisseur = require("../models/Fournisseur");
const Fournisseur = require("../models/Fournisseur");
const Fournisseur = require("../models/Fournisseur");

const CreateFournisseur = async (req, res) => {
    try {
        const {name, contact} = req.body;

        const Fournisseur = await Fournisseur.create({name, contact, user: req.user._id});

        res.status(201).json({message: "Fournisseur Created", Fournisseur})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getFournisseurs = async (req, res) => {
    try {
        const Fournisseurs = await Fournisseur.find({user: req.user._id});
        res.json(Fournisseurs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getFournisseur = async (req, res) => {
    try {
        const Fournisseur = await Fournisseur.findOne({_id: req.params.id, user: req.user._id,});

        if (!Fournisseur) {
            return res.status(404).json({ message: "Fournisseur not found" });
        }
        res.json(Fournisseur);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateFournisseur = async(req, res) => {
    try {
        const Fournisseur = await Fournisseur.findOneAndUpdate({_id: req.params.id, user: req.user._id}, req.body,{ new: true});

        if (!Fournisseur) {
            return res.status(404).json({ message: "Fournisseur not found" });
        }
        res.json(Fournisseur);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteFournisseur = async (req, res) => {
    try {
        const Fournisseur = await Fournisseur.findOneAndDelete({_id: req.params.id, user: req.user._id,});

        if (!Fournisseur) {
            return res.status(404).json({ message: "Fournisseur not found" });
        }
        res.json({ message: "Fournisseur deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}