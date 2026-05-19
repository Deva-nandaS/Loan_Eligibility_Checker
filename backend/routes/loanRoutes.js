const express = require("express");
const router = express.Router();
const { applyLoan, getLoanResult,getLoanHistory,getApplication, getApplicationById, updateOverride } = require("../controllers/loanController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/authorizeRole");


router.post("/apply", authMiddleware, applyLoan);          
router.get("/result/:id", authMiddleware, getLoanResult);
router.get("/history", authMiddleware, getLoanHistory);   
router.get("/viewapplications",authMiddleware,getApplication);
router.get("/applicationdetails/:id",authMiddleware,getApplicationById);
router.put("/override/:id",authMiddleware,authorizeRole("admin"),updateOverride);

module.exports = router;