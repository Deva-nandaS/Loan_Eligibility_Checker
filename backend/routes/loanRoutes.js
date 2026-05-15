const express = require("express");
const router = express.Router();
const { applyLoan, getLoanResult,getLoanHistory } = require("../controllers/loanController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/apply", authMiddleware, applyLoan);          
router.get("/result/:id", authMiddleware, getLoanResult);
router.get("/history", authMiddleware, getLoanHistory);   

module.exports = router;