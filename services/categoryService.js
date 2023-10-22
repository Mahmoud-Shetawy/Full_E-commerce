const slugify = require("slugify");
const { catchAsync } = require("async-handler-express");

const CategoryModel = require("../models/categoryModel.js");

// @desc    Get All categories
// @route  GET /api/v1/categories
// @access public
exports.getCategories = catchAsync(async (req, res) => {
	// paginate categories
	const limit = req.query.limit * 1 || 5;
	const pages = req.query.page * 1 || 1;
	const skip = (pages - 1) * limit;

	const category = await CategoryModel.find({}).skip(skip).limit(limit);
	res.status(200).json({
		// result: "category",
		pages,
		result: category.length,
		data: category,
	});
});

// @desc   Get specific category by id
// @route  GET /api/v1/categories/:id
// @access public

exports.getCategoryById = catchAsync(async (req, res) => {
	const idOfCategory = req.params.id;
	// console.log("😒 => idOfCategory:", idOfCategory);
	const category = await CategoryModel.findById(idOfCategory);
	if (!category) {
		res.status(404).json({ message: "not find category" });
	} else {
		res.status(200).json({
			message: "Success",
			data: category,
		});
	}
});

// @desc    Create a category
// @route  POST /api/v1/categories
// @access private
exports.createCategory = catchAsync(async (req, res) => {
	const name = req.body.name;

	const Category = await CategoryModel.create({ name, slug: slugify(name) });
	res.status(200).json({ data: Category });
});

// @desc   Update specific category by id
// @route  PUT /api/v1/categories/:id
// @access Private

exports.updateCategory = catchAsync(async (req, res) => {
	const id = req.params.id;
	const name = req.body.name;
	const category = await CategoryModel.findByIdAndUpdate(
		{ _id: id },
		{ name, slug: slugify(name) },
		{ new: true }
	);

	if (!category) {
		res.status(404).json({ message: "not find category" });
	} else {
		res.status(200).json({
			message: "Success",
			data: category,
		});
	}
});

// @desc   delete specific category by id
// @route  DELETE /api/v1/categories/:id
// @access Private

exports.deleteCategory = catchAsync(async (req, res) => {
	const id = req.params.id;
	const category = await CategoryModel.findByIdAndDelete(id);
	if (!category) {
		res.status(404).json({ message: "not find category" });
	} else {
		res.status(200).json({
			message: "Success",
		});
	}
});
