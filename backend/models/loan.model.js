const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  emptype: { type: String, required: true },
  income: { type: Number, required: true },
  debt: { type: Number, required: true },
  credit: { type: Number, required: true },
  tenure: { type: Number, required: true },
  loanTenure: { type: Number, required: true },
  purpose: { type: String, required: true },
  amount: { type: Number, required: true },

  eligible: { type: Boolean },
  interestRate: { type: Number },
  riskCategory: { type: String },
  reasons: { type: [String] },
  emi: { type: Number },
  totalPayable: { type: Number },
  totalInterestPayable: { type: Number },
  debtRatio: { type: String },
  breakdown: {
    base: { type: Number },
    employment: { type: Number },
    purpose: { type: Number },
  },
  suggestions: { type: [String] },

  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Loan", loanSchema);
