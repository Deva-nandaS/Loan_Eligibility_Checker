const express = require("express");
const router = express.Router();
const loanController = require("../controllers/loanController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/apply", authMiddleware, loanController);

module.exports = router;
