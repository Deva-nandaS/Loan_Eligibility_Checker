const loanEligibility = require("../utils/loanEligibility");
const loanCalculator = require("../utils/loanCalculator");
const Loan = require("../models/loan.model");

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

const loanController = async (req, res) => {
  try {
    const applicant = {
      ...req.body,
      age: Number(req.body.age),
      income: Number(req.body.income),
      debt: Number(req.body.debt),
      credit: Number(req.body.credit),
      tenure: Number(req.body.tenure),
      amount: Number(req.body.amount),
    };

    const eligibility = loanEligibility(applicant);
    console.log("applicant:", applicant); // ✅ inside controller
    console.log("eligibility:", eligibility); // ✅ inside controller

    if (!eligibility.eligible) {
      return res.status(422).json({
        status: "REJECTED",
        reason: eligibility.reasons[0],
        suggestions: getSuggestions(eligibility.reasons),
        reapplyAfter: "90 days",
      });
    }

    const calc = loanCalculator(applicant);
    const debtRatio = (applicant.debt / applicant.income).toFixed(2);
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
      approvedAmsount: applicant.amount,
      annualInterestrate: `${calc.finalRate}%`,
      monthlyEMI: calc.emi,
      tenure: `${applicant.tenure} months`,
      totalPayable,
      totalInterestPayable,
      riskCategory: eligibility.riskcategory,
      debtRatio,
      breakdown: {
        base: calc.baseRate,
        employment: calc.Rate,
        purpose: calc.purposeRate,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = loanController;
