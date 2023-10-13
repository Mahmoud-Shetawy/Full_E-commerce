const express = require("express");

const {
	getCategories,
	createCategory,
} = require("../services/categoryService.js");
// const { models } = require("mongoose");

const router = express.Router();

// router.post("/", getCategories);

router.route("/").post(createCategory).get(getCategories);

module.exports = router;
