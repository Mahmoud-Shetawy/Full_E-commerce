const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Category requires "],
			unique: [true, "category must be unique"],
			minlength: [3, "too short category name"],
			maxlength: [30, "too long category name"],
		},
		slug: {
			type: String,
			lowercase: true,
		},
		images: String,
	},
	{ timestamps: true }
);

const CategoryModel = mongoose.model("category", categorySchema);

module.exports = CategoryModel;
