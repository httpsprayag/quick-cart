const { format, createLogger, transports } = require("winston");
const { combine, timestamp, printf, colorize, align } = format;

const path = require("path");

const logger = createLogger({
  level: "info",
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.File({
      filename: path.resolve(__dirname, "../../logs/info.log"),
    }),
    new transports.File({
      level: "error",
      filename: path.resolve(__dirname, "../../logs/error.log"),
    }),
new transports.Console(),
  ],
});

module.exports = logger;
