const loanMetrics = require("./config/loanMetrics");
const loan = require("./models/loan.model");
const {
  MIN_AGE,
  MAX_AGE,
  MIN_MONTHLY_INCOME,
  MAX_DEBT_TO_INCOME_RATIO,
  MIN_CREDIT_SCORE,
  MAX_LOAN_MULTIPLIER,
  MIN_JOB_TENURE_YEARS,
} = loanMetrics;



const loanEligibility = (applicant) => {
  const err = [];

  if (applicant.age < MIN_AGE || applicant.age > MAX_AGE) {
    err.push("Age should be between 21 and 65");
  }
  if (applicant.income < MIN_MONTHLY_INCOME) {
    err.push("Minimum income criteria not met.");
  }
  if (applicant.debtR > MAX_DEBT_TO_INCOME_RATIO) {
    res.push("Existing debts cannot exceed 40% of income ");
  }

  if ((applicant.credit = MIN_CREDIT_SCORE)) {
    err.push("Not enough credit score ");
  }
  if (applicant.loanAmount > applicant.income * MAX_LOAN_MULTIPLIER) {
    err.push("Loan amount cannot exceed 10x monthly income");
  }
  if (
    applicant.emptype === salaried &&
    applicant.tenure < MIN_JOB_TENURE_YEARS
  ) {
    err.push("Must have atleast 1 year at current job");
  }
  return err;
};

module.exports = loanEligibility;
