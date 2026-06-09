import { useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { PiSpinnerGap } from "react-icons/pi";

import { Input } from "../../Components/ui/Input";
import { Button } from "../../Components/ui/Button";
import { Sidebar } from "../../Components/Sidebar";
import {
  ELIGIBILITY_THRESHOLDS,
  EMPLOYMENT_TYPES,
  LOAN_PURPOSES,
} from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { applyLoanthunk } from "../../redux/slices/loanSlice";

export const Apply = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { collapsed } = useSelector((state) => state.sidebar);
  const { loading, error } = useSelector((state) => state.loan);

  const [name, setName] = useState(location.state?.name || "");
  const [age, setAge] = useState(location.state?.age || "");
  const [emptype, setEmptype] = useState("Salaried");
  const [income, setIncome] = useState("");
  const [credit, setCredit] = useState("");
  const [tenure, setTenure] = useState("");
  const [loanTenure, setloanTenure] = useState("");
  const [purpose, setPurpose] = useState("Home");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState({});
  const [debt, setDebt] = useState("");
  const [activeField, setActiveField] = useState(null);

  const validate = () => {
    const errors = {};

    if (!name) errors.name = "Name is required";
    if (!age) {
      errors.age = "Age is required";
    } else if (
      age < ELIGIBILITY_THRESHOLDS.MIN_AGE ||
      age > ELIGIBILITY_THRESHOLDS.MAX_AGE
    ) {
      errors.age = "Age must be between 21 and 65";
    }

    if (!income) {
      errors.income = "Income is required";
    }
    if (!credit) {
      errors.credit = "Credit score is required";
    } else if (Number(credit) < ELIGIBILITY_THRESHOLDS.MIN_CREDIT_SCORE) {
      errors.credit = `Minimum credit score is ${ELIGIBILITY_THRESHOLDS.MIN_CREDIT_SCORE} `;
    }
    if (!tenure) {
      errors.tenure = "Job tenure is required";
    } else if (
      emptype === "Salaried" &&
      Number(tenure) < ELIGIBILITY_THRESHOLDS.MIN_JOB_TENURE_YEARS
    ) {
      errors.tenure = "Minimum 1 year tenure required";
    }

    if (!debt) {
      errors.debt = "Debt is required";
    }
    if (!loanTenure) {
      errors.loanTenure = "Loan tenure is required";
    } else if (Number(loanTenure) < 6) {
      errors.loanTenure = "Minimum tenure is 6 months";
    } else if (Number(loanTenure) > 360) {
      errors.loanTenure = "Maximum tenure is 360 months";
    }

    if (!amount) {
      errors.amount = "Amount is required";
    }
    return errors;
  };

  const handleChange = (setter, field, message) => (e) => {
    setter(e.target.value);
    setErrors((p) => ({
      ...p,
      [field]: e.target.value ? "" : message,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors before submitting");
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      const result = await dispatch(
        applyLoanthunk({
          name,
          age,
          amount,
          emptype,
          income,
          debt,
          credit,
          tenure,
          loanTenure,
          purpose,
        }),
      ).unwrap();
      console.log(result);
      console.log(result.payload);

      toast.success("Submitted");
      navigate(`/applicant/result/${result.payload.loanId}`, { replace: true });
    } catch (err) {
      toast.error(error);
    }
  };

  const isFormValid =
    !!name &&
    !!age &&
    Number(age) >= ELIGIBILITY_THRESHOLDS.MIN_AGE &&
    Number(age) <= ELIGIBILITY_THRESHOLDS.MAX_AGE &&
    !!income &&
    !!debt &&
    !!credit &&
    Number(credit) >= ELIGIBILITY_THRESHOLDS.MIN_CREDIT_SCORE &&
    !!tenure &&
    (emptype !== "Salaried" ||
      Number(tenure) >= ELIGIBILITY_THRESHOLDS.MIN_JOB_TENURE_YEARS) &&
    !!loanTenure &&
    !!amount;

  console.log({
    name: !!name,
    age: !!age,
    minAge: Number(age) >= ELIGIBILITY_THRESHOLDS.MIN_AGE,
    maxAge: Number(age) <= ELIGIBILITY_THRESHOLDS.MAX_AGE,
    income: !!income,
    credit: !!credit,
    creditScore: Number(credit) >= ELIGIBILITY_THRESHOLDS.MIN_CREDIT_SCORE,
    tenure: !!tenure,
    tenureCheck:
      emptype !== "Salaried" ||
      Number(tenure) >= ELIGIBILITY_THRESHOLDS.MIN_JOB_TENURE_YEARS,
    loanTenure: !!loanTenure,
    amount: !!amount,
  });

  const Tooltip = ({ field, message }) => (
    <div className="relative flex items-center gap-1.5">
      <AiOutlineInfoCircle
        size={14}
        className="text-gray-400 cursor-pointer"
        onMouseEnter={() => setActiveField(field)}
        onMouseLeave={() => setActiveField(null)}
      />
      {activeField === field && (
        <div className="absolute bg-white rounded-md shadow top-10 z-10 border p-2 w-48 text-xs">
          <p>{message}</p>
        </div>
      )}
    </div>
  );

  console.log("loading:", loading);
  console.log("isFormValid:", isFormValid);
  return (
    <div className="flex min-h-screen overflow-hidden">
      <Sidebar />

      <div
        className={`flex-1 transition-all duration-300  bg-white overflow-y-auto py-8 px-4 md:p-6  ${collapsed ? "ml-24" : "ml-32"}`}
      >
        <div className="max-w-2xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col rounded-xl border-teal-800 border shadow-2xl p-6 sm:p-8 w-full bg-white"
          >
            <div className="w-full">
              <div className="flex border-b-teal-800 border-b items-center justify-center">
                <h4 className="text-black text-2xl sm:text-3xl mb-4 font-semibold text-center">
                  Loan Application Form
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-7">
                <div>
                  <label className="font-bold mb-1 block">Name</label>
                  <Input
                    className="border-2 rounded-lg w-full p-2"
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={handleChange(setName, "name", "Name is required")}
                    required
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="font-bold mb-1 block">Age</label>
                  <Input
                    className="border-2 rounded-lg w-full p-2"
                    type="number"
                    placeholder="age"
                    value={age}
                    onChange={handleChange(setAge, "age", "Age is required")}
                    required
                  />
                  {errors.age && (
                    <p className="text-red-500 text-xs mt-1">{errors.age}</p>
                  )}
                </div>

                <div>
                  <label className="font-bold mb-1 block">Monthly Income</label>
                  <Input
                    className="border-2 rounded-lg w-full p-2"
                    type="number"
                    placeholder="eg:20,000"
                    value={income}
                    onChange={handleChange(
                      setIncome,
                      "income",
                      "Monthly income is required",
                    )}
                    required
                  />
                  {errors.income && (
                    <p className="text-red-500 text-xs mt-1">{errors.income}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <label className="font-bold mb-1 block">Loan amount</label>
                    <Tooltip
                      field="loanamount"
                      message="Amount cannot exceed 40% of income"
                    />
                  </div>
                  <Input
                    className="border-2 rounded-lg w-full p-2"
                    type="number"
                    placeholder="eg:50,000"
                    value={amount}
                    onChange={handleChange(
                      setAmount,
                      "amount",
                      "Amount is required",
                    )}
                    required
                  />
                  {errors.amount && (
                    <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <label className="font-bold mb-1 block">
                      Loan tenure(in months)
                    </label>
                    <Tooltip
                      field="loanTenure"
                      message="Enter how many months to repay the loan."
                    />
                  </div>
                  <Input
                    className="border-2 rounded-lg w-full p-2"
                    type="number"
                    placeholder="eg: 12"
                    value={loanTenure}
                    onChange={handleChange(
                      setloanTenure,
                      "loanTenure",
                      "Loan tenure is required",
                    )}
                    required
                  />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <label className="font-bold mb-1 block">Credit Score</label>
                    <Tooltip
                      field="credit"
                      message="Minimum credit score should be 650."
                    />
                  </div>
                  <Input
                    className="border-2 rounded-lg w-full p-2"
                    type="number"
                    placeholder="eg:700"
                    value={credit}
                    onChange={handleChange(
                      setCredit,
                      "credit",
                      "Credit score is required",
                    )}
                    required
                  />
                </div>

                <div>
                  <label className="font-bold mb-1 block">Loan Purpose</label>
                  <select
                    className="border-2 rounded-lg w-full p-2"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                  >
                    {LOAN_PURPOSES.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold mb-1 block">Existing Debt</label>
                  <Input
                    className="border-2 rounded-lg w-full p-2"
                    type="number"
                    placeholder="eg:10,000"
                    value={debt}
                    onChange={handleChange(
                      setDebt,
                      "debt",
                      "Debt field is required",
                    )}
                    required
                  />
                  {errors.debt && (
                    <p className="text-red-500 text-xs mt-1">{errors.debt}</p>
                  )}
                </div>

                <div>
                  <label className="font-bold mb-1 block">
                    Employment Type
                  </label>
                  <select
                    className="border-2 rounded-lg w-full p-2"
                    value={emptype}
                    onChange={(e) => setEmptype(e.target.value)}
                  >
                    {EMPLOYMENT_TYPES.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <label className="font-bold mb-1 block">
                      Years of Experience
                    </label>
                    <Tooltip
                      field="experience"
                      message="How many years of experience in your current job"
                    />
                  </div>
                  <Input
                    className="border-2 rounded-lg w-full p-2"
                    type="number"
                    placeholder="eg:2"
                    value={tenure}
                    onChange={handleChange(
                      setTenure,
                      "tenure",
                      "Job Tenure field is required",
                    )}
                    required
                  />
                  {errors.tenure && (
                    <p className="text-red-500 text-xs mt-1">{errors.tenure}</p>
                  )}
                </div>

                <div className="col-span-1 sm:col-span-2 flex items-center justify-center">
                  <Button
                    disabled={loading || !isFormValid}
                    type="submit"
                    className={`mt-5 text-white font-bold rounded-md py-2 px-10 disabled:opacity-50 disabled:cursor-not-allowed ${
                      loading || !isFormValid
                        ? "bg-gray-400"
                        : "bg-teal-900 cursor-pointer"
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <PiSpinnerGap size={24} className="animate-spin" />
                        Submitting...
                      </div>
                    ) : (
                      "SUBMIT"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
