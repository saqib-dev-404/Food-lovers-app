const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./database/database");
const winston = require("winston");

const logConfiguration = {
  transports: [
    new winston.transports.Console({
      level: "warn",
    }),
    new winston.transports.File({
      level: "error",
      // Create the log directory if it does not exist
      filename: "logs/example.log",
    }),
  ],
};
const logger = winston.createLogger(logConfiguration);

process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down due to uncaught exception");
  process.exit(1);
});
// Setting up config file
dotenv.config({ path: "Backend/config/config.env" });
// Path: Backend\server.js

connectDatabase();
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on Port: ${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
