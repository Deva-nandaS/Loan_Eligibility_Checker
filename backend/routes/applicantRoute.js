const express = require("express");
const router = express.Router();

const { getApplicantDashboard } = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/authorizeRole");

router.get(
  "/applicantdashboard",
  authorizeRole("applicant"),
  getApplicantDashboard,
);

module.exports = router;
