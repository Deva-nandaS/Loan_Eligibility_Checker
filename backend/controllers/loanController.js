const loanEligibility = require("../utils/loanEligibility");
const loanCalculator = require("../utils/loanCalculator");
const Loan = require("../models/loan.model");

const loanController = async (req, res) => {
  const applicant = req.body;

  const eligibility = loanEligibility(applicant);

  if (!eligibility.eligible) {
    return res.status(400).json({
      status: "REJECTED",
      reason: eligibility.reasons[0],
      suggestions: getSuggestions(eligibility.reasons),
      reapplyAfter: "90 days",
    });
  }

  const calc = loanCalculator(applicant);

  const dtiRatio = (applicant.debt / applicant.income).toFixed(2);
  const totalPayable = Math.round(calc.emi * applicant.tenure);
  const totalInterestPayable = totalPayable - applicant.amount;

  await Loan.create({
    ...applicant,
    eligible: true,
    interestRate: calc.finalRate,
    riskCategory: eligibility.riskCategory,
  });

  return res.status(200).json({
    status: "APPROVED",
    applicantName: applicant.name,
    requestedAmount: applicant.amount,
    approvedAmount: applicant.amount,
    annualInterestRate: `${calc.finalRate}%`,
    monthlyEMI: calc.emi,
    tenure: `${applicant.tenure} months`,
    totalPayable,
    totalInterestPayable,
    riskCategory: eligibility.riskCategory,
    debtToIncomeRatio: dtiRatio,
    breakdown: {
      base: calc.baseRate,
      employment: calc.empRate,
      purpose: calc.purposeRate,
    },
  });
};

const getSuggestions = (reasons) => {
  const suggestions = [];
  reasons.forEach((r) => {
    if (r.includes("income")) suggestions.push("Increase your monthly income");
    if (r.includes("credit")) suggestions.push("Improve your credit score");
    if (r.includes("debt")) suggestions.push("Reduce existing debts");
    if (r.includes("amount")) suggestions.push("Apply for a lower loan amount");
    if (r.includes("age")) suggestions.push("Check age eligibility criteria");
    if (r.includes("tenure"))
      suggestions.push("Complete at least 1 year at current job");
  });
  return suggestions;
};

module.exports = loanController;
