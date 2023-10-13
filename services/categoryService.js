const slugify = require("slugify");
const Category = require("../models/categoryModel.js");

exports.getCategories = (req, res) => {
	// const name = req.body.name;
	// const newCategory = new CategoryModel({ name });
	// newCategory
	// 	.save()
	// 	.then((doc) => {
	// 		res.json(doc);
	// 	})
	// 	.catch((err) => {
	// 		res.json(err);
	// 	});
};

exports.createCategory = (req, res) => {
	const name = req.body.name;

	Category.create({ name, slug: slugify(name) })
		.then((category) => {
			res.status(200).json({ data: category });
		})
		.catch((err) => {
			res.status(400).send(err);
		});
};
