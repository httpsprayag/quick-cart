const express = require("express");
const app = express();
const cors = require("cors");

module.exports = function () {
  app.use([cors(), express.json(), express.urlencoded({ extended: false })]);
  app.use("/api", require("../routes"));
  return app;
};
