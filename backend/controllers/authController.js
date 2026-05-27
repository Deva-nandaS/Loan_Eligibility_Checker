const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const loan = require("../models/loan.model");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User already reg", data: null });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json({
      success: true,
      message: "User registered",

      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, data: null });
  }
};

exports.login = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found", data: null });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
        data: null,
      });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: { id: user._id, email: user.email, role: user.role },
        token,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, data: null });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found", data: null });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect current password" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password updated ",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, data: null });
  }
};

exports.ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: "false", message: "Email not found", data: null });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD_APP_EMAIL,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset",
      html: `
      <h2>Reset your password</h2>
      <p>Click the link below to reset your password.</p>
      <a href="http://localhost:5000/resetpassword/${token}">Reset Password</a>`,
    });

    res.status(200).json({
      message: "Reset link sent to your email",
    });
  } catch (err) {
    (res.status(500),
      json({ success: false, message: err.message, data: null }));
  }
};

exports.ResetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token", data: null });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found", data: null });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.status(200).json({ success: true, message: "Password updated" });
  } catch (err) {
    if (err.name === "TokenExpired") {
      return res
        .status(401)
        .json({ success: false, message: "Link expired", data: null });
    }
    return res
      .status(500)
      .json({ success: false, message: err.message, data: null });
  }
};
exports.getAdminDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    const userCount = await User.countDocuments({ role: "applicant" });
    const loanCount = await loan.countDocuments();
    const approvedCount = await loan.countDocuments({ eligible: true });
    const rejectedCount = await loan.countDocuments({ eligible: false });

    res.status(200).json({
      success: true,
      message: "Admin dashboard",
      data: { user, userCount, loanCount, approvedCount, rejectedCount },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      data: null,
    });
  }
};

exports.getApplicantDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    res.status(200).json({
      success: true,
      message: "Applicant dashboard",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      data: null,
    });
  }
};
