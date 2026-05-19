const loanMetrics = require("../config/loanMetrics");
const {
  MIN_AGE,
  MAX_AGE,
  MIN_MONTHLY_INCOME,
  MAX_DEBT_TO_INCOME_RATIO,
  MIN_CREDIT_SCORE,
  MAX_LOAN_MULTIPLIER,
  MIN_JOB_TENURE_YEARS,
  INTEREST_RATE_MATRIX,
   EMPLOYMENT_TYPE_MULTIPLIERS ,
   LOAN_PURPOSE_MULTIPLIERS
  
} = loanMetrics;

const loanEligibility = (applicant) => {
  
  const err = [];

  if (applicant.age < MIN_AGE || applicant.age > MAX_AGE) {
    err.push("Age should be between 21 and 65");
  }
  if (applicant.income < MIN_MONTHLY_INCOME) {
    err.push("Minimum income criteria not met.");
  }
  const dtiRatio = applicant.debt / applicant.income;
  if (dtiRatio > MAX_DEBT_TO_INCOME_RATIO) {
    err.push("Existing debts cannot exceed 40% of income ");
  }

  if (applicant.credit < MIN_CREDIT_SCORE) {
    err.push("Not enough credit score ");
  }
  if (applicant.amount > applicant.income * MAX_LOAN_MULTIPLIER)
    err.push("Loan amount cannot exceed 10x monthly income");

  if (
    applicant.emptype ==="Salaried" &&
    applicant.tenure < MIN_JOB_TENURE_YEARS
  ) {
    err.push("Must have atleast 1 year at current job");
  }
  if (applicant.emptype === "Unemployed") {
  err.push("Unemployed applicants are not eligible");
}
  
  const rateInfo = INTEREST_RATE_MATRIX.find(
    (r) => applicant.credit >= r.min && applicant.credit <= r.max,
  );

  if (err.length > 0) {
    return { eligible: false, reasons: err };
  }

  return {
    eligible: true,
    riskCategory: rateInfo.category,
  };
};

module.exports = loanEligibility;
