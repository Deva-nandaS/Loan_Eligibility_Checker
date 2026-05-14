const express = require("express");
const router = express.Router();

const { getAdminDashboard } = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/authorizeRole");

router.get(
  "/admindashboard",
  authMiddleware,
  authorizeRole("admin"),
  getAdminDashboard,
);

module.exports = router;
