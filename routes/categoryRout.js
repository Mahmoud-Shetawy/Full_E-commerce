const express = require("express");

const {
	getCategories,
	getCategoryById,
	createCategory,
	updateCategory,
	deleteCategory,
} = require("../services/categoryService.js");
// const { models } = require("mongoose");

const router = express.Router();

// router.post("/", getCategories);

router.route("/").post(createCategory).get(getCategories);
router
	.route("/:id")
	.get(getCategoryById)
	.put(updateCategory)
	.delete(deleteCategory);

module.exports = router;
