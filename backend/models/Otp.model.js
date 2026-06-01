const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
        
  name: {
    type: String,
    required: true,
  },
      
  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  otp: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Date,
    expires: "10m",
    default: Date.now,
  },
});

module.exports = mongoose.model("Otp", otpSchema);
