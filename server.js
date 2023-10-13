const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { json } = require("express/lib/response");

// Load env variables from .env file.
dotenv.config({ path: "config.env" });

//Middleware configuration
const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
	console.log(`mode: ${process.env.NODE_ENV}`);
}

mongoose
	.connect(process.env.DB_URL)
	.then((conn) => {
		console.log(`DataBase Connected ${conn.connection.port}`);
	})
	.catch((err) => {
		console.log(`DataBase Error : ${err}`);
	});

const categorySchema = mongoose.Schema({
	name: String,
});

const CategoryModel = mongoose.model("category", categorySchema);

app.post("/", (req, res) => {
	const name = req.body.name;

	const newCategory = new CategoryModel({ name });

	newCategory
		.save()
		.then((doc) => {
			res.json(doc);
		})
		.catch((err) => {
			res.json(err);
		});
});

const PORT = process.env.PORT;
app.listen(PORT || 8000, () => {
	console.log(`Server is running on port ${PORT}`);
});
