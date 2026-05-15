// config/loanMetrics.js
const MIN_AGE = 21;
const MAX_AGE = 65;
const MIN_MONTHLY_INCOME = 15000;
const MAX_DEBT_TO_INCOME_RATIO = 0.4;
const MIN_CREDIT_SCORE = 650;
const MAX_LOAN_MULTIPLIER = 10;
const MIN_JOB_TENURE_YEARS = 1;

const INTEREST_RATE_MATRIX = [
  { min: 800, max: 900, rate: 8.5, category: "Excellent" },
  { min: 750, max: 799, rate: 10.0, category: "Good" },
  { min: 700, max: 749, rate: 12.5, category: "Fair" },
  { min: 650, max: 699, rate: 15.0, category: "Below Average" },
  { min: 0, max: 649, rate: null, category: "High Risk" },
];

const EMPLOYMENT_TYPE_MULTIPLIERS = [
  { type: "Salaried", rate: 0, note: "Most Favourable Category" },
  { type: "Self Employed", rate: 1.5, note: "Slightly higher risk" },
  { type: "Freelance", rate: 2.5, note: "Income volatility considered" },
  { type: "Unemployed", rate: null, note: "Not eligible" },
];

const LOAN_PURPOSE_MULTIPLIERS = [
  { purpose: "Home", rate: 0.5 },
  { purpose: "Education", rate: 0.25 },
  { purpose: "Vehicle", rate: 0 },
  { purpose: "Business", rate: 1 },
  { purpose: "Personal", rate: 1.5 },
];

module.exports = {
  MIN_AGE,
  MAX_AGE,
  MIN_MONTHLY_INCOME,
  MAX_DEBT_TO_INCOME_RATIO,
  MIN_CREDIT_SCORE,
  MAX_LOAN_MULTIPLIER,
  MIN_JOB_TENURE_YEARS,
  INTEREST_RATE_MATRIX,
  EMPLOYMENT_TYPE_MULTIPLIERS,
  LOAN_PURPOSE_MULTIPLIERS,
};
