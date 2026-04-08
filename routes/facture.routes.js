const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth.middleware");

const {createFacture, getFactures, updateFacture, deleteFacture,} = require("../controllers/facture.controller");

router.post("/", protect, createFacture);
router.get("/", protect, getFactures);
router.put("/:id", protect, updateFacture);
router.delete("/:id", protect, deleteFacture);

module.exports = router;