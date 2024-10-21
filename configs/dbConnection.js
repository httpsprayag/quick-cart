const process = require("process");
const mongoose = require("mongoose");
require("dotenv").config();

const dConnection = process.env.DB_URL;

mongoose.connect(dConnection);
const db = mongoose.connection;

db.on("error", (error) => {
  logger.error("Error caught: %s", error.message);
});
db.once("open", () => {
  logger.info("Connected to MongoDB");
});

module.exports = db;
