const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

async function run() {
  try {
  } finally {
  }
}

app.get("/", (req, res) => {
  res.send("Welcome to Start Floor Cleaning Project Server");
});

app.listen(port, () => {
  console.log("Starting server on port " + port);
});
