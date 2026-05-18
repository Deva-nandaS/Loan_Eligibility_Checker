import { useState } from "react";
import { Input } from "../../Components/ui/Input";
import { Button } from "../../Components/ui/Button";
import { Sidebar } from "../../Components/Sidebar";
import { toast } from "react-toastify";
import { createLoan } from "../../api/apply";
import { useNavigate } from "react-router-dom";

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
      console.log("res:", res);
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

  return (
    <div className=" flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="w-full flex justify-center items-center bg-white  ">
        <form
          onSubmit={handleSubmit}
          className=" flex flex-col rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md mx-4"
        >
          <div className="max-w-sm mx-auto w-full">
            <h4 className=" text-black text-2xl sm:text-3xl mb-4 font-semibold text-center">
              Loan Application Form
            </h4>

            <div className="border-b my-10"></div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-bold mb-1 block">Name</label>
                <Input
                  className="border-2 rounded-lg w-full p-2"
                  type="text"
                  placeholder="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors((p) => ({ ...p, name: "" }));
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
                    setErrors((p) => ({ ...p, age: "" }));
                  }}
                  required
                />
                {errors.age && (
                  <p className="text-red-500 text-xs mt-1">{errors.age}</p>
                )}
              </div>

              <div>
                <label className="font-bold mb-1 block">Amount</label>
                <Input
                  className="border-2 rounded-lg w-full p-2"
                  type="number"
                  placeholder="amount"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setErrors((p) => ({ ...p, amount: "" }));
                  }}
                  required
                />
                {errors.amount && (
                  <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
                )}
              </div>

              <div>
                <label className="font-bold mb-1 block">Loan tenure</label>
                <Input
                  className="border-2 rounded-lg w-full p-2"
                  type="number"
                  placeholder="Loan Tenure"
                  value={loanTenure}
                  onChange={(e) => {
                    setloanTenure(e.target.value);
                    setErrors((p) => ({ ...p, loanTenure: "" }));
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
                  placeholder="credit score"
                  value={credit}
                  onChange={(e) => {
                    setCredit(e.target.value);
                    setErrors((p) => ({ ...p, credit: "" }));
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
                <label className="font-bold mb-1 block">Income</label>
                <Input
                  className="border-2 rounded-lg w-full p-2"
                  type="number"
                  placeholder="income"
                  value={income}
                  onChange={(e) => {
                    setIncome(e.target.value);
                    setErrors((p) => ({ ...p, income: "" }));
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
                  placeholder="monthly debt"
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
                <label className="font-bold mb-1 block">
                  Years of Experience
                </label>
                <Input
                  className="border-2 rounded-lg w-full p-2"
                  type="number"
                  placeholder="job tenure"
                  value={tenure}
                  onChange={(e) => {
                    setTenure(e.target.value);
                    setErrors((p) => ({ ...p, tenure: "" }));
                  }}
                  required
                />
                {errors.tenure && (
                  <p className="text-red-500 text-xs mt-1">{errors.tenure}</p>
                )}
              </div>

              <div className="col-span-2">
                <Button
                  disabled={loading}
                  type="submit"
                  className="w-full bg-gray-900 text-white font-bold rounded-lg py-2"
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
