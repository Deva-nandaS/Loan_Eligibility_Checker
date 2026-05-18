const express = require("express");
const router = express.Router();
const { applyLoan, getLoanResult,getLoanHistory,getApplication, getApplicationById } = require("../controllers/loanController");
const authMiddleware = require("../middleware/authMiddleware");


router.post("/apply", authMiddleware, applyLoan);          
router.get("/result/:id", authMiddleware, getLoanResult);
router.get("/history", authMiddleware, getLoanHistory);   
router.get("/viewapplications",authMiddleware,getApplication);
router.get("/applicationdetails/:id",authMiddleware,getApplicationById);

module.exports = router;