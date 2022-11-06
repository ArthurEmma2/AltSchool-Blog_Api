require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// routing
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");

// middlewares
const authMiddleware = require("./middlewares/auth");
const errorHandler = require("./middlewares/error-handler");

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", authMiddleware, blogRoutes);

app.use(errorHandler);

const port = process.env.PORT || 8000;

      mongoose.connect(process.env.MONGO_URL)

      mongoose.connection.on("connected", () => {
        console.log("Connected to MongoDB Successfully");
      });
      mongoose.connection.on("error", (err) => {
        console.log("An error occurred while connecting to MongoDB");
        console.log(err);
      });
      app.listen(port, () => {
        console.log("app is listening");
      });


  module.exports = app;
