const express = require("express");
const router = express.Router();

const validate = require("../middlewares/validate.middleware");
const { registerSchema } = require("../validators/auth.validator");
const { register, login } = require("../controllers/auth.controller");
const protect = require("../middlewares/auth.middleware");

router.post("/register", validate(registerSchema), register);

router.post("/login", login);

router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;