const express = require("express");
const router = express.Router();
const { sendOtp,verifyOtp,login, changePassword, forgotPassword ,resetPassword} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");


router.post("/sendotp",sendOtp);
router.post("/verifyotp",verifyOtp);
router.post("/login", login);
router.put("/changepassword",authMiddleware,changePassword)
router.post("/forgotpassword",forgotPassword)
router.post("/resetpassword/:token",resetPassword)


module.exports = router;
