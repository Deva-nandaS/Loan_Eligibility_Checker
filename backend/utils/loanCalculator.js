const {
  INTEREST_RATE_MATRIX,
  EMPLOYMENT_TYPE_MULTIPLIERS,
  LOAN_PURPOSE_MULTIPLIERS,
} = require("../config/loanMetrics");

const loanCalculator = (applicant) => {
  const rateInfo = INTEREST_RATE_MATRIX.find(
    (r) =>
      Number(applicant.credit) >= r.min && Number(applicant.credit) <= r.max,
  );
  const empInfo = EMPLOYMENT_TYPE_MULTIPLIERS.find(
    (e) => applicant.emptype === e.type,
  );
  const purposeInfo = LOAN_PURPOSE_MULTIPLIERS.find(
    (p) => applicant.purpose === p.purpose,
  );

  if (!rateInfo || !empInfo || !purposeInfo) {
    throw new Error(
      `Calculator error: rateInfo=${!!rateInfo}, empInfo=${!!empInfo}, purposeInfo=${!!purposeInfo}`,
    );
  }

  const finalRate = rateInfo.rate + empInfo.rate + purposeInfo.rate;

  const monthlyInterest = finalRate / 100 / 12;
  const loanTenure = applicant.loanTenure;
  const numerator =
    applicant.amount *
    monthlyInterest *
    Math.pow(1 + monthlyInterest, loanTenure);
  const denominator = Math.pow(1 + monthlyInterest, loanTenure) - 1;
  const emi = numerator / denominator;

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
