import { useState } from "react";
import { Input } from "../../Components/ui/Input";
import { Button } from "../../Components/ui/Button";
import { Sidebar } from "../../Components/Sidebar";
import { toast } from "react-toastify";
import { createLoan } from "../../api/apply";
import { useNavigate } from "react-router-dom";
import { AiOutlineInfoCircle } from "react-icons/ai";

export const Apply = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
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
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!name) newErrors.name = "Name is required";
    if (!age) {
      newErrors.age = "Age is required";
    } else if (age < 21 || age > 65) {
      newErrors.age = "Age must be between 21 and 65";
    }

    if (!income) {
      newErrors.income = "Income is required";
    } else if (Number(income) < 15000) {
      newErrors.income = "Minimum income is ₹15,000";
    }
    if (!credit) {
      newErrors.credit = "Credit score is required";
    } else if (Number(credit) < 650) {
      newErrors.credit = "Minimum credit score is 650";
    }
    if (!tenure) {
      newErrors.tenure = "Job tenure is required";
    } else if (emptype === "Salaried" && Number(tenure) < 1) {
      newErrors.tenure = "Minimum 1 year tenure required";
    }

    if (!loanTenure) {
      newErrors.loanTenure = "Loan tenure is required";
    }

    if (!amount) {
      newErrors.amount = "Amount is required";
    } else if (Number(amount) > Number(income) * 10) {
      newErrors.amount = "Amount cannot exceed 10x income";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors before submitting");
      return;
    }

    try {
      setLoading(true);
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
    Number(income) >= 15000 &&
    !!credit &&
    Number(credit) >= 650 &&
    !!tenure &&
    (emptype !== "Salaried" || Number(tenure) >= 1) &&
    !!loanTenure &&
    !!amount &&
    Number(amount) <= Number(income) * 10;

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <Sidebar />
      <div className="w-full flex justify-center items-center  bg-gray-50 overflow-y-auto py-8 px-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col rounded-xl  border-teal-800 border shadow-2xl p-6 sm:p-8 w-full max-w-2xl bg-white"
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
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!e.target.value) {
                      setErrors((p) => ({ ...p, name: "Name is required" }));
                    } else {
                      setErrors((p) => ({ ...p, name: "" }));
                    }
                  }}
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
                  onChange={(e) => {
                    setAge(e.target.value);
                    if (
                      !e.target.value ||
                      e.target.value < 21 ||
                      e.target.value > 65
                    ) {
                      setErrors((p) => ({
                        ...p,
                        age: "Age must be between 21 and 65",
                      }));
                    } else {
                      setErrors((p) => ({ ...p, age: "" }));
                    }
                  }}
                  required
                />
                {errors.age && (
                  <p className="text-red-500 text-xs mt-1">{errors.age}</p>
                )}
              </div>

              <div>
                <label className="font-bold mb-1 block">Loan Amount</label>
                <Input
                  className="border-2 rounded-lg w-full p-2"
                  type="number"
                  placeholder="eg:50,000"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    if (
                      !e.target.value ||
                      Number(e.target.value) > Number(income) * 10
                    ) {
                      setErrors((p) => ({
                        ...p,
                        amount: "Amount cannot exceed 10x income",
                      }));
                    } else {
                      setErrors((p) => ({ ...p, amount: "" }));
                    }
                  }}
                  required
                />
                {errors.amount && (
                  <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
                )}
              </div>

              <div>
                <div className=" relative flex items-center gap-1.5">
                  <label className="font-bold mb-1 block">
                    Loan tenure(in months)
                  </label>
                  <AiOutlineInfoCircle
                    size={14}
                    className="text-gray-400 cursor-pointer"
                    onMouseEnter={() => setActiveField("loanTenure")}
                    onMouseLeave={() => setActiveField(null)}
                  />
                  {activeField === "loanTenure" && (
                    <div className="absolute bg-white rounded-md shadow top-10 z-10 border p-2 w-48 text-xs">
                      <p>Enter how many months to repay the loan.</p>
                    </div>
                  )}
                </div>

                <Input
                  className="border-2 rounded-lg w-full p-2"
                  type="number"
                  placeholder="eg: 12"
                  value={loanTenure}
                  onChange={(e) => {
                    setloanTenure(e.target.value);
                    if (!e.target.value) {
                      setErrors((p) => ({
                        ...p,
                        loanTenure: "Loan tenure is required",
                      }));
                    } else {
                      setErrors((p) => ({ ...p, loanTenure: "" }));
                    }
                  }}
                  required
                />
                {errors.loanTenure && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.loanTenure}
                  </p>
                )}
              </div>

              <div>
                <label className="font-bold mb-1 block">Credit Score</label>
                <Input
                  className="border-2 rounded-lg w-full p-2"
                  type="number"
                  placeholder="eg:700"
                  value={credit}
                  onChange={(e) => {
                    setCredit(e.target.value);
                    if (!e.target.value || Number(e.target.value) < 650) {
                      setErrors((p) => ({
                        ...p,
                        credit: "Minimum credit score is 650",
                      }));
                    } else {
                      setErrors((p) => ({ ...p, credit: "" }));
                    }
                  }}
                  required
                />
                {errors.credit && (
                  <p className="text-red-500 text-xs mt-1">{errors.credit}</p>
                )}
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

              <div>
                <label className="font-bold mb-1 block">Monthly Income</label>
                <Input
                  className="border-2 rounded-lg w-full p-2"
                  type="number"
                  placeholder="eg:20,000"
                  value={income}
                  onChange={(e) => {
                    setIncome(e.target.value);
                    if (!e.target.value || Number(e.target.value) < 15000) {
                      setErrors((p) => ({
                        ...p,
                        income: "Minimum income is ₹15,000",
                      }));
                    } else {
                      setErrors((p) => ({ ...p, income: "" }));
                    }
                  }}
                  required
                />
                {errors.income && (
                  <p className="text-red-500 text-xs mt-1">{errors.income}</p>
                )}
              </div>

              <div>
                <label className="font-bold mb-1 block">Existing Debt</label>
                <Input
                  className="border-2 rounded-lg w-full p-2"
                  type="number"
                  placeholder="eg:10,000"
                  value={debt}
                  onChange={(e) => {
                    setDebt(e.target.value);
                    setErrors((p) => ({ ...p, debt: "" }));
                  }}
                />
                {errors.debt && (
                  <p className="text-red-500 text-xs mt-1">{errors.debt}</p>
                )}
              </div>
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

              <div>
                <div className=" relative flex items-center gap-1.5">
                  <label className="font-bold mb-1 block">
                    {" "}
                    Years of Experience
                  </label>
                  <AiOutlineInfoCircle
                    size={14}
                    className="text-gray-400 cursor-pointer"
                    onMouseEnter={() => setActiveField("experience")}
                    onMouseLeave={() => setActiveField(null)}
                  />
                  {activeField === "experience" && (
                    <div className="absolute bg-white rounded-md shadow top-10 z-10 border p-2 w-48 text-xs">
                      <p>How many years of experience in your current job</p>
                    </div>
                  )}
                </div>

                <Input
                  className="border-2 rounded-lg w-full p-2"
                  type="number"
                  placeholder="eg:2"
                  value={tenure}
                  onChange={(e) => {
                    setTenure(e.target.value);
                    if (
                      !e.target.value ||
                      (emptype === "Salaried" && Number(e.target.value) < 1)
                    ) {
                      setErrors((p) => ({
                        ...p,
                        tenure: "Minimum 1 year tenure required",
                      }));
                    } else {
                      setErrors((p) => ({ ...p, tenure: "" }));
                    }
                  }}
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
                  {loading ? "Submitting..." : "SUBMIT"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
