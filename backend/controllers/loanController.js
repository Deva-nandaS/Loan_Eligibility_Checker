const loanEligibility = require("../utils/loanEligibility");
const loanCalculator = require("../utils/loanCalculator");
const Loan = require("../models/loan.model");

const getLoanResult = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) {
      return res.status(404).json({ message: "Resource(loan) not found" });
    } else {
      return res.status(200).json(loan);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getSuggestions = (reasons) => {
  const suggestions = [];
  reasons.forEach((r) => {
    if (r.includes("income")) suggestions.push("Increase your monthly income");
    if (r.includes("credit")) suggestions.push("Improve your credit score");
    if (r.includes("debt")) suggestions.push("Reduce existing debts");
    if (r.includes("amount")) suggestions.push("Apply for a lower loan amount");
    if (r.includes("tenure"))
      suggestions.push("Complete at least 1 year at current job");
    if (r.includes("Unemployed") || r.includes("unemployed"))
      suggestions.push("Be an employ first");
  });
  return suggestions;
};

const applyLoan = async (req, res) => {
  try {
    const applicant = {
      ...req.body,
      age: Number(req.body.age),
      income: Number(req.body.income),
      debt: Number(req.body.debt),
      credit: Number(req.body.credit),
      tenure: Number(req.body.tenure),
      loanTenure: Number(req.body.loanTenure),
      amount: Number(req.body.amount),
    };

    const eligibility = loanEligibility(applicant);

    if (!eligibility.eligible) {
      // rejected loan
      const loan = await Loan.create({
        ...applicant,
        user: req.user.userId,
        eligible: false,
        reasons: eligibility.reasons,
        suggestions: getSuggestions(eligibility.reasons),
      });
      return res.status(422).json({
        status: "REJECTED",
        loanId: loan._id,
        reason: eligibility.reasons[0],
        suggestions: getSuggestions(eligibility.reasons),
        reapplyAfter: "90 days",
      });
    }

    const calc = loanCalculator(applicant);
    const tenureMonths = applicant.loanTenure * 12;
    const debtRatio = (applicant.debt / applicant.income).toFixed(2);
    const totalPayable = Math.round(calc.emi * tenureMonths);
    const totalInterestPayable = totalPayable - applicant.amount;

    const loan = await Loan.create({
      ...applicant,
      eligible: true,
      user: req.user.userId,
      interestRate: calc.finalRate,
      riskCategory: eligibility.riskCategory,
      emi: calc.emi,
      totalPayable,
      totalInterestPayable,
      debtRatio,
    });
    return res.status(200).json({
      status: "APPROVED",
      loanId: loan._id,
      applicantName: applicant.name,
      requestedAmount: applicant.amount,
      approvedAmount: applicant.amount,
      annualInterestRate: `${calc.finalRate}%`,
      monthlyEMI: calc.emi,
      tenure: `${applicant.tenure} months`,
      tenure: `${tenureMonths} months`,
      totalPayable,
      totalInterestPayable,
      riskCategory: eligibility.riskCategory,
      debtRatio,
      breakdown: {
        base: calc.baseRate,
        employment: calc.empRate,
        purpose: calc.purposeRate,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const getLoanHistory = async (req, res) => {
  try {
    const loans = await Loan.find({ user: req.user.userId }).sort({
      createdAt: -1,
    });
    console.log("user id:", req.user.userId);
    console.log("loans found:", loans.length);
    console.log("req.user:", req.user);
    return res.status(200).json(loans);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getApplication = async (req, res) => {
  try {
    const applications = await Loan.find();
    return res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getApplicationById = async (req, res) => {
  try {
    const applicationDetails = await Loan.findById(req.params.id);
    return res.status(200).json(applicationDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { applyLoan, getLoanResult, getLoanHistory, getApplication,getApplicationById };


