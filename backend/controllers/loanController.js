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
  const suggestions = new Set();
  reasons.forEach((r) => {
    if (r.includes("income")) suggestions.add("Increase your monthly income");
    if (r.includes("credit")) suggestions.add("Improve your credit score");
    if (r.includes("debt")) suggestions.add("Reduce existing debts");
    if (r.includes("amount")) suggestions.add("Apply for a lower loan amount");
    if (r.includes("tenure"))
      suggestions.add("Complete at least 1 year at current job");
    if (r.includes("Unemployed") || r.includes("unemployed"))
      suggestions.add("Be an employee first");
  });
  return [...suggestions];
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
      return res.status(200).json({
        status: "REJECTED",
        loanId: loan._id,
        reason: eligibility.reasons[0],
        suggestions: getSuggestions(eligibility.reasons),
        reapplyAfter: "90 days",
      });
    }

    const calc = loanCalculator(applicant);
    const debtRatio = (applicant.debt / applicant.income).toFixed(2);
    const totalPayable = Math.round(calc.emi * applicant.loanTenure);
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
      tenure: `${applicant.tenure} year`,
      loanTenure: `${applicant.loanTenure} months`,
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
    return res.status(500).json({ message: err.message });
  }
};

const getLoanHistory = async (req, res) => {
  try {
    const loans = await Loan.find({ user: req.user.userId }).sort({
      createdAt: -1,
    });

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

const updateOverride = async (req, res) => {
  try {
    const { eligible, reason, suggestions } = req.body; //data send (need to update) from frontend
    console.log("Updated", req.body);
    const loan = await Loan.findById(req.params.id); //data already in db
    console.log("db data:", loan);
    let updatedData = {
      eligible,
      reasons: [reason],
      suggestions: [suggestions],
    };
    if (eligible === true) {
      const calc = loanCalculator(loan);
      const eligibility = loanEligibility(loan);
      console.log("calculated data", calc);
      const debtRatio = (loan.debt / loan.income).toFixed(2);
      const totalPayable = Math.round(calc.emi * loan.loanTenure);
      const totalInterestPayable = totalPayable - loan.amount;

      updatedData = {
        ...updatedData,
        interestRate: calc.finalRate,
        riskCategory: eligibility.riskCategory,
        emi: calc.emi,
        totalPayable,
        totalInterestPayable,
        debtRatio,
      };
    }
    const updatedLoan = await Loan.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true },
    );
    console.log("updated loan:", updatedLoan);
    return res.status(200).json(updatedLoan);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  applyLoan,
  getLoanResult,
  getLoanHistory,
  getApplication,
  getApplicationById,
  updateOverride,
};
