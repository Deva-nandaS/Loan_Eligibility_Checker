export const LOAN_PURPOSES = ["Home", "Education", "Vehicle", "Business", "Personal"];
export const EMPLOYMENT_TYPES = ["Salaried", "Self Employed", "Freelance", "Unemployed"];
export const ELIGIBILITY_THRESHOLDS = {
  MIN_AGE: 21,
  MAX_AGE: 65,
  MIN_MONTHLY_INCOME: 15000,
  MAX_DEBT_TO_INCOME_RATIO: 0.4,
  MIN_CREDIT_SCORE: 650,
  MAX_LOAN_MULTIPLIER: 10,
  MIN_JOB_TENURE_YEARS: 1,
};

export const INTEREST_RATE_MATRIX = [
  { range: "800 to 900", rate: "8.5%",     risk: "Excellent" },
  { range: "750 to 799", rate: "10.0%",    risk: "Good" },
  { range: "700 to 749", rate: "12.5%",    risk: "Fair" },
  { range: "650 to 699", rate: "15.0%",    risk: "Below Average" },
  { range: "Below 650",  rate: "Rejected", risk: "High Risk" },
];

export const EMPLOYMENT_MULTIPLIERS = [
  { type: "Salaried",      adjustment: "+0%",          note: "Base rate" },
  { type: "Self-Employed", adjustment: "+1.5%",         note: "Slightly higher risk" },
  { type: "Freelance",     adjustment: "+2.5%",         note: "Income volatility considered" },
  { type: "Unemployed",    adjustment: "Auto-Rejected", note: "Not eligible regardless of other factors" },
];

export const LOAN_PURPOSE_MULTIPLIERS = [
  { purpose: "Home",      adjustment: "-0.5% (discount)" },
  { purpose: "Education", adjustment: "-0.25% (discount)" },
  { purpose: "Vehicle",   adjustment: "+0%" },
  { purpose: "Business",  adjustment: "+1.0%" },
  { purpose: "Personal",  adjustment: "+1.5%" },
];


export const getSuccessFields = (result) => [
  { label: "Applicant",              value: result.name },
  { label: "Requested Amount",       value: result.amount },
  { label: "Approved Amount",        value: result.amount },
  { label: "Annual Interest Rate",   value: `${result.interestRate}%` },
  { label: "Monthly EMI",            value: result.emi },
  { label: "Total Payable",          value: result.totalPayable },
  { label: "Total Interest Payable", value: result.totalInterestPayable },
  { label: "Risk Category",          value: result.riskCategory },
  { label: "Debt Ratio",             value: result.debtRatio },
];

export const getApprovedFields = (d) => [
  { label: "Applicant",              value: d.name },
  { label: "Status",                 value: d.eligible ? "Approved" : "Rejected" },
  { label: "Employee Type",          value: d.emptype },
  { label: "Job Tenure",             value: d.tenure },
  { label: "Income",                 value: d.income },
  { label: "Debt",                   value: d.debt },
  { label: "Debt Ratio",             value: d.debtRatio },
  { label: "Credit Score",           value: d.credit },
  { label: "Risk Category",          value: d.riskCategory },
  { label: "Loan Purpose",           value: d.purpose },
  { label: "Approved Amount",        value: d.amount },
  { label: "Requested Amount",       value: d.amount },
  { label: "Annual Interest Rate",   value: d.interestRate },
  { label: "EMI",                    value: d.emi },
  { label: "Total Payable",          value: d.totalPayable },
  { label: "Total Interest Payable", value: d.totalInterestPayable },
  { label: "Reasons",                value: d.reasons.length > 0 ? d.reasons.join(", ") : "N/A" },
  { label: "Suggestions",            value: d.suggestions.length > 0 ? d.suggestions.join(", ") : "N/A" },
];

export const getRejectedFields = (d) => [
  { label: "Applicant",        value: d.name },
  { label: "Status",           value: d.eligible ? "Approved" : "Rejected" },
  { label: "Age",              value: d.age },
  { label: "Employee Type",    value: d.emptype },
  { label: "Job Tenure",       value: d.tenure },
  { label: "Income",           value: d.income },
  { label: "Debt",             value: d.debt },
  { label: "Credit Score",     value: d.credit },
  { label: "Loan Purpose",     value: d.purpose },
  { label: "Requested Amount", value: d.amount },
  { label: "Loan Tenure",      value: d.loanTenure },
  { label: "Reasons",          value: d.reasons.length > 0 ? d.reasons.join(", ") : "N/A" },
  { label: "Suggestions",      value: d.suggestions.length > 0 ? d.suggestions.join(", ") : "N/A" },
];


export const HISTORY_TABLE_HEADERS = [
  "Requested Amount",
  "Approved Amount", 
  "Annual Interest Rate",
  "Monthly EMI",
  "Total Paid",
  "Interest Paid",
  "Loan Tenure",
  "Status",
];