const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API runs...");
});

app.listen(5000, console.log("Server running on port 5000"));
