const mongoose = require("mongoose");

const connectDatabase = () => {
  // This is a function that connects to the database

  mongoose
    .connect(process.env.DB_PORT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Database connected with server: ${data.connection.host}`);
    });
};

module.exports = connectDatabase;
