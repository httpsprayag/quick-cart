require("dotenv").config();
const express = require("./configs/express");
const logger = require("./configs/logger");
const app = express();
require("./configs/dbConnection");

global.logger = logger;

const PORT = process.env.PORT || 8001;

app.listen(PORT, (error) => {
  if (error) logger.error("Error caught: %s", error);
  else logger.info("server listen from port no. : " + `${PORT}`);
});
