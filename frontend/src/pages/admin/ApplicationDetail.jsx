import { useNavigate, useParams } from "react-router-dom";
import { Sidebar } from "../../Components/Sidebar";
import { getApplicationById, updateOverride } from "../../api/admindashboard";
import { useState } from "react";
import { Button } from "../../Components/ui/Button";
import { useEffect } from "react";

export const ApplicationDetail = () => {
  const [showDetails, setShowDetails] = useState(null);
  const [showOverride, setShowOverride] = useState(false);
  const [reason, setReason] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getApplicationById(id);
        console.log("APPLICATION DETAIL id:", id);
        console.log("APPLIACTION DETAIL data:", data);
        setShowDetails(data);
      } catch (err) {
        navigate("/applicant/apply", { replace: true });
      }
    };
    fetchData();
  }, [id]);

  const handleOverride = () => setShowOverride(true);
  const handleConfirm = async () => {
    try {
      const response = await updateOverride(
        id,
        !showDetails.eligible,
        reason,
        suggestion,
      );
      console.log("override response:", response);
      setShowDetails({
        ...showDetails,
        eligible: !showDetails.eligible,
        reason: [reason],
        suggestions: [suggestion],
      });
      console.log("ShowDetails", showDetails);
      setShowOverride(false);
    } catch (err) {
      console.log("override error:", err);
    }
  };

  if (!showDetails)
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex justify-center items-center p-6">
        <div
          className={`bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg border border-teal-800 border-
           `}
        >
          {showDetails.eligible ? (
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 -mx-8 px-8">
              {[
                ["Applicant", showDetails.name],
                ["Status:", showDetails.eligible ? "Approved" : "Rejected"],
                ["Age", showDetails.age],
                ["Employee type:", showDetails.emptype],
                ["Job Tenure:", `${showDetails.tenure}`],
                ["Income", showDetails.income],
                ["Debt", showDetails.debt],
                ["Debt Ratio", showDetails.debtRatio],
                ["Credit Score:", showDetails.credit],
                ["Risk Category", showDetails.riskCategory],
                ["Loan Purpose:", showDetails.purpose],
                ["Requested Amount", `${showDetails.amount}`],
                ["Approved Amount", `${showDetails.amount}`],
                ["Loan Tenure:", `${showDetails.loanTenure}`],
                ["Annual Interest Rate", `${showDetails.interestRate}%`],
                ["EMI:", `${showDetails.emi}`],
                ["Total Payable", `${showDetails.totalPayable}`],
                [
                  "Total Interest Payable",
                  `${showDetails.totalInterestPayable}`,
                ],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between ">
                  <span className="font-semibold text-gray-600">{label}</span>
                  <span className="font-medium mr-5">{value}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 -mx-8 px-8">
              {[
                ["Applicant", showDetails.name],
                ["Status", showDetails.eligible ? "Approved" : "Rejected"],
                ["Age", showDetails.age],
                ["Employee type:", showDetails.emptype],
                ["Job Tenure:", `${showDetails.tenure}`],

                ["Income", showDetails.income],
                ["Debt", showDetails.debt],
                ["Debt Ratio", showDetails.debtRatio],
                ["Credit Score:", showDetails.credit],
                ["Risk Category", showDetails.riskCategory],
                ["Loan Purpose:", showDetails.purpose],
                ["Requested Amount", `${showDetails.amount}`],
                ["Loan Tenure:", `${showDetails.loanTenure}`],
                ["Job Tenure:", `${showDetails.tenure}`],
                [
                  "Reasons:",
                  showDetails.reasons.length > 0
                    ? showDetails.reasons.join(",")
                    : "N/A",
                ],
                [
                  "Suggestions:",
                  showDetails.suggestions.length > 0
                    ? showDetails.suggestions.join(",")
                    : "N/A",
                ],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between pb-2 mr-3">
                  <span className="font-semibold text-gray-600 ">{label}</span>
                  <span className="font-medium ml-8">{value}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-4 mt-8">
            <Button
              className="flex-1 bg-gray-400 border text-black rounded-lg font-bold py-2 hover:bg-gray-200"
              onClick={() =>
                navigate("/admin/ViewApplication", { replace: true })
              }
            >
              Back
            </Button>

            <Button
              className="flex-1 bg-teal-800  text-white rounded-lg font-bold py-2 hover:bg-gray-800"
              onClick={handleOverride}
            >
              Override
            </Button>
            <Button
              className="flex-1 bg-teal-800 text-white rounded-lg font-bold py-2 hover:bg-gray-800"
              onClick={() =>
                navigate("/admin/AdminDashboard", { replace: true })
              }
            >
              Done
            </Button>
          </div>

          {showOverride && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="border-2 border-teal-700 bg-white shadow-2xl w-[450px] rounded-xl">
                <div className="flex flex-col p-6 gap-5">
                  <h2 className="font-bold text-lg border-b pb-2">
                    Status Updation
                  </h2>
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold">Reason:</label>
                    <input
                      type="text"
                      value={reason}
                      placeholder="Enter reason"
                      className="border p-2 rounded"
                      onChange={(e) => setReason(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold">Suggestions:</label>
                    <input
                      type="text"
                      value={suggestion}
                      placeholder="Enter suggestion"
                      className="border p-2 rounded"
                      onChange={(e) => setSuggestion(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <div className="border px-5 bg-gray-300 text-black rounded-md p-2">
                      <Button
                        className="font-bold"
                        onClick={() => setShowOverride(false)}
                      >
                        Back
                      </Button>
                    </div>
                    <div className="border px-5 bg-teal-800 text-white rounded-md p-2">
                      <Button className="font-bold" onClick={handleConfirm}>
                        Confirm
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
