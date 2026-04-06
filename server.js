const express = require("express");
const dotenv = require("dotenv");
const connectDB = require('./config/DB');

dotenv.config();

connectDB();

const app = express();


app.use(express.json());


app.get("/", (req, res) => {
  res.send("WELCOME Smart Invoice API! 🚀");
});


app.listen(8000, () => {
  console.log("Server running on port http://localhost:8000 🚀");
});