import { useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "../../Components/Sidebar";

export const Result = () => {
  const { state: result } = useLocation();
  const navigate = useNavigate();

  if (!result) {
    navigate("/applicant/apply");
    return null;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex justify-center items-center bg-white p-6">
        <div className={`w-full max-w-lg rounded-xl shadow-2xl p-8 border-2 
          ${result.status === "APPROVED" ? "border-green-500" : "border-red-500"}`}>

          {result.status === "APPROVED" ? (
            <>
              <h2 className="text-green-600 text-3xl font-bold text-center mb-6">✅ APPROVED</h2>
              <div className="space-y-2">
                <p><span className="font-bold">Applicant:</span> {result.applicantName}</p>
                <p><span className="font-bold">Requested Amount:</span> ₹{result.requestedAmount}</p>
                <p><span className="font-bold">Approved Amount:</span> ₹{result.approvedAmount}</p>
                <p><span className="font-bold">Annual Interest Rate:</span> {result.annualInterestRate}</p>
                <p><span className="font-bold">Monthly EMI:</span> ₹{result.monthlyEMI}</p>
                <p><span className="font-bold">Tenure:</span> {result.tenure}</p>
                <p><span className="font-bold">Total Payable:</span> ₹{result.totalPayable}</p>
                <p><span className="font-bold">Total Interest:</span> ₹{result.totalInterestPayable}</p>
                <p><span className="font-bold">Risk Category:</span> {result.riskCategory}</p>
                <p><span className="font-bold">Debt Ratio:</span> {result.debtRatio}</p>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="font-bold mb-1">Rate Breakdown:</p>
                  <p>Base Rate: {result.breakdown?.base}%</p>
                  <p>Employment: {result.breakdown?.employment}%</p>
                  <p>Purpose: {result.breakdown?.purpose}%</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-red-600 text-3xl font-bold text-center mb-6">❌ REJECTED</h2>
              <div className="space-y-2">
                <p><span className="font-bold">Reason:</span> {result.reason}</p>
                <p><span className="font-bold">Reapply After:</span> {result.reapplyAfter}</p>
                <div className="mt-4">
                  <p className="font-bold mb-1">Suggestions:</p>
                  {result.suggestions?.map((s, i) => (
                    <p key={i}>• {s}</p>
                  ))}
                </div>
              </div>
            </>
          )}

          <button
            onClick={() => navigate("/applicant/apply")}
            className="mt-6 w-full bg-gray-900 text-white font-bold rounded-lg py-2"
          >
            Apply Again
          </button>
        </div>
      </div>
    </div>
  );
};