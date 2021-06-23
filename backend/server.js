const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");

const userRoute = require("./routes/users");

const app = express();

connectDB();

app.use(express.json());

app.use("/api/users", userRoute);

app.listen(5000, console.log("Server running on port 5000"));
