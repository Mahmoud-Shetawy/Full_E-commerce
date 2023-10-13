const express = require("express");

const { getCategories } = require("../services/categoryService.js");
// const { models } = require("mongoose");

const router = express.Router();

router.post("/", getCategories);

module.exports = router;
