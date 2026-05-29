const express = require("express");
const router = express.Router();
const {
  applyLoan,
  getLoanResult,
  getLoanHistory,
  getApplication,
  getApplicationById,
  updateOverride,
} = require("../controllers/loanController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/authorizeRole");
const loanValidation = require("../validations/loanValidation"); 

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

router.post("/apply", authMiddleware, validate(loanValidation), applyLoan);
router.get("/result/:id", authMiddleware, getLoanResult);
router.get("/history", authMiddleware, getLoanHistory);
router.get("/viewapplications", authMiddleware, getApplication);
router.get("/applicationdetails/:id", authMiddleware, getApplicationById);
router.put(
  "/override/:id",
  authMiddleware,
  authorizeRole("admin"),
  updateOverride,
);

module.exports = router;
