const {
  INTEREST_RATE_MATRIX,
  EMPLOYMENT_TYPE_MULTIPLIERS,
  LOAN_PURPOSE_MULTIPLIERS,
} = require("../config/loanMetrics");

const loanCalculator = (applicant) => {
  const rateInfo = INTEREST_RATE_MATRIX.find(
    (r) => applicant.credit >= r.min && applicant.credit <= r.max,
  );
  const empInfo = EMPLOYMENT_TYPE_MULTIPLIERS.find(
    (e) => applicant.emptype === e.type,
  );
  const purposeInfo = LOAN_PURPOSE_MULTIPLIERS.find(
    (p) => applicant.purpose === p.purpose,
  );

  const finalRate = rateInfo.rate + empInfo.rate + purposeInfo.rate;

  const monthlyInterest = finalRate / 100 / 12;
  const loanTenure = applicant.loanTenure;
  const first =
    applicant.amount *
    monthlyInterest *
    Math.pow(1 + monthlyInterest, loanTenure);
  const second = Math.pow(1 + monthlyInterest, loanTenure) - 1;
  const emi = first / second;

  return {
    finalRate,
    baseRate: rateInfo.rate,
    empRate: empInfo.rate,
    purposeRate: purposeInfo.rate,
    monthlyInterest,
    emi: Math.round(emi),
  };
};

module.exports = loanCalculator;
