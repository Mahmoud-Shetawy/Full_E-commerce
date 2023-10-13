const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");

const dbConnection = require("./config/database.js");
const categoryRoute = require("./routes/categoryRout.js");

dbConnection();

// Load env variables from .env file.
dotenv.config({ path: "config.env" });

const app = express();

//Middleware configuration

app.use(express.json());

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
	console.log(`mode: ${process.env.NODE_ENV}`);
}

//mount Route
app.use("/api/v1/categories", categoryRoute);

const PORT = process.env.PORT;
app.listen(PORT || 8000, () => {
	console.log(`Server is running on port ${PORT}`);
});
