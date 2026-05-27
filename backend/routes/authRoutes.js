const express = require("express");
const router = express.Router();
const { register, login, changePassword, ForgotPassword ,ResetPassword} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.put("/changepassword",authMiddleware,changePassword)
router.post("/forgotpassword",ForgotPassword)
router.put("/resetpassword/:token",ResetPassword)

module.exports = router;
