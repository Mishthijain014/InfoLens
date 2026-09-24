const express = require("express");

const {
  addUrlContent
} = require("../controllers/content.controller");

const protect = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/url", protect, addUrlContent);

module.exports = router;