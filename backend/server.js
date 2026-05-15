require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const User = require("./models/User");
const authRoutes = require("./routes/authRoutes");
const adminRoute = require("./routes/adminRoute");
const applicantRoute = require("./routes/applicantRoute");
const loanRoutes = require("./routes/loanRoutes");
const seedAdmin = require("./seed/seedAdmin");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
seedAdmin();

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoute);
app.use("/api/applicant", applicantRoute);
app.use("/api/apply", loanRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
