const loanEligibility = require("./utils/loanEligibility");
const loanCalculator = require("../utils/loanCalculator");

const loanController = async (req, res) => {
  const applicant = req.body;

  const eligibilty = loanEligibility(applicant);
  if (!eligibilty.eligible) {
    return res
      .status(422)
      .json({ success: false, message: "Unprocessed Entity" });
  }

  const calc = loanCalculator(applicant);
  return res
    .status(200)
    .json({
      success: true,
      interestRate: calc.interestRate,
      emi: calc.emi,
      riskCategory: eligibilty.riskCategory,
    });
};
