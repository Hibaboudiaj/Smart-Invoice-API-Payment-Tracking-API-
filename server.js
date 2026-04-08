const express = require("express");
const dotenv = require("dotenv");
const connectDB = require('./config/DB');

dotenv.config();

const app = express();

connectDB();

app.use(express.json());


app.get("/", (req, res) => {
  res.send("WELCOME Smart Invoice API! 🚀");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT} 🚀`);
});