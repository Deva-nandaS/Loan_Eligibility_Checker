import { useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { PiSpinnerGap } from "react-icons/pi";

import { Input } from "../../Components/ui/Input";
import { Button } from "../../Components/ui/Button";
import { Sidebar } from "../../Components/Sidebar";
import { createLoan } from "../../api/apply";

export const Apply = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
  const [loading, setLoading] = useState(false);
  const [activeField, setActiveField] = useState(null);

  const validate = () => {
    const errors = {};

    if (!name) errors.name = "Name is required";
    if (!age) {
      errors.age = "Age is required";
    } else if (age < 21 || age > 65) {
      errors.age = "Age must be between 21 and 65";
    }

    if (!income) {
      errors.income = "Income is required";
    }
    if (!credit) {
      errors.credit = "Credit score is required";
    } else if (Number(credit) < 650) {
      errors.credit = "Minimum credit score is 650";
    }
    if (!tenure) {
      errors.tenure = "Job tenure is required";
    } else if (emptype === "Salaried" && Number(tenure) < 1) {
      errors.tenure = "Minimum 1 year tenure required";
    }

    if (!loanTenure) {
      errors.loanTenure = "Loan tenure is required";
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

    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const res = await createLoan({
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
      });
      toast.success("Submitted");
      navigate(`/applicant/result/${res.loanId}`, { replace: true });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Submission failed");
      const errdata = err?.response?.data;
      navigate(`/applicant/result/${errdata.loanId}`, { replace: true });
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    !!name &&
    !!age &&
    Number(age) >= 21 &&
    Number(age) <= 65 &&
    !!income &&
    !!credit &&
    Number(credit) >= 650 &&
    !!tenure &&
    (emptype !== "Salaried" || Number(tenure) >= 1) &&
    !!loanTenure &&
    !!amount;

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

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 ml-56 bg-white overflow-y-auto py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col fixed rounded-xl  border-teal-800 border shadow-2xl p-6 sm:p-8 w-full max-w-2xl bg-white"
          >
            <div className="w-full ">
              <div className="flex border-b-teal-800  border-b items-center justify-center ">
                {" "}
                <h4 className=" text-black text-3xl mb-5sm:text-3xl mb-4 font-semibold  text-center">
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

                {/* Monthlyincome */}
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
              

                {/* loanamount */}
                <div>
                <div className=" flex items-center gap-1.5">
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

              {/* loantenure */}
              <div>
                <div className=" flex items-center gap-1.5">
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
              {/* credit */}
              <div>
                <div className="relative flex items-center gap-1.5">
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
                  <option>Home</option>
                  <option>Education</option>
                  <option>Vehicle</option>
                  <option>Business</option>
                  <option>Personal</option>
                </select>
              </div>

              {/* debt */}
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

              {/* employmentType */}
              <div>
                <label className="font-bold mb-1 block">Employment Type</label>
                <select
                  className="border-2 rounded-lg w-full p-2"
                  value={emptype}
                  onChange={(e) => setEmptype(e.target.value)}
                >
                  <option>Salaried</option>
                  <option>Self Employed</option>
                  <option>Freelance</option>
                  <option>Unemployed</option>
                </select>
              </div>

              {/* experience */}
              <div>
                <div className=" relative flex items-center gap-1.5">
                  <label className="font-bold mb-1 block">
                    {" "}
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

              <div className="col-span-2  flex items-center justify-center w-fu;;">
                <Button
                  disabled={loading || !isFormValid}
                  type="submit"
                  className={` mt-5 text-white font-bold rounded-md py-2 px-10 disabled:opacity-50 disabled:cursor-not-allowed ${
                    loading || !isFormValid
                      ? "bg-gray-400"
                      : "bg-teal-900 cursor-pointer"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <PiSpinnerGap size={34} className="animate-spin" />
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
