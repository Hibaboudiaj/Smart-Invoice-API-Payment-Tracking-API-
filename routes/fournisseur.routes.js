const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth.middleware");

const {
  createFournisseur, 
  getFournisseurs, 
  getFournisseur, 
  updateFournisseur, 
  deleteFournisseur,
} = require("../controllers/Fournisseur.controller");

router.post("/", protect, createFournisseur);
router.get("/", protect, getFournisseurs);
router.get("/:id", protect, getFournisseur);
router.put("/:id", protect, updateFournisseur);
router.delete("/:id", protect, deleteFournisseur);

module.exports = router;