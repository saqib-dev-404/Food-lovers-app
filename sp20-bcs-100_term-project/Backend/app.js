const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMidlleware = require("./middleware/error");

//import routes

const productRoutes = require("./routes/productRoute");
const restaurentRoutes = require("./routes/restaurentRoute");
const userRoutes = require("./routes/userRoute");

//middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", productRoutes);
app.use("/api/v1", restaurentRoutes);
app.use("/api/v1", userRoutes);

//error middleware
app.use(errorMidlleware);

module.exports = app;
