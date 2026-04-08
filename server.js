const express = require("express");
const dotenv = require("dotenv");
const connectDB = require('./config/DB');
const authRoutes = require("./routes/auth.routes");
const fournisseurRoutes = require("./routes/fournisseur.routes");
const factureRoutes = require("./routes/facture.routes");
const paymentRoutes = require("./routes/payment.routes");

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("./api/fournisseurs", fournisseurRoutes);

app.use("/api/factures", factureRoutes);

app.use("/api", paymentRoutes);

app.get("/", (req, res) => {
  res.send("WELCOME Smart Invoice API! 🚀");
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT} 🚀`);
});