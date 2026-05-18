import { useNavigate, useParams } from "react-router-dom";
import { Sidebar } from "../../Components/Sidebar";
import { getApplicationById } from "../../api/admindashboard";
import { useState } from "react";
import { Button } from "../../Components/ui/Button";
import { useEffect } from "react";

export const ApplicationDetail = () => {
  const [showDetails, setShowDetails] = useState(null);
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
          className={`bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg border
           `}
        >
          {showDetails.eligible ? (
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 -mx-8 px-8">
              {[
                ["Applicant", showDetails.name],
                ["Status:", showDetails.eligible?"Approved":"Rejected"],
                ["Age", showDetails.age],
                ["Income", showDetails.income],
                ["Credit Score:", showDetails.credit],
                ["Requested Amount", `${showDetails.amount}`],
                ["Approved Amount", `${showDetails.amount}`],
                ["Loan Tenure:", `${showDetails.loanTenure}`],
                ["Job Tenure:", `${showDetails.tenure}`],
                ["EMI:", `${showDetails.emi}`],
                ["Annual Interest Rate", `${showDetails.interestRate}%`],
                ["Total Payable", `${showDetails.totalPayable}`],
                [
                  "Total Interest Payable",
                  `${showDetails.totalInterestPayable}`,
                ],
                ["Risk Category", showDetails.riskCategory],
                ["Debt", showDetails.debt],
                ["Employee type:", showDetails.empType],
                ["Loan Purpose:", showDetails.purpose],
                ["Debt Ratio", showDetails.debtRatio],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between ">
                  <span className="font-semibold text-gray-600">{label}</span>
                  <span className="font-medium mr-5">{value}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {[
                ["Applicant", showDetails.name],
                ["Age", showDetails.age],
                ["Income", showDetails.income],
                ["Credit Score:", showDetails.credit],
                ["Requested Amount", `${showDetails.amount}`],
                ["Loan Tenure:", `${showDetails.loanTenure}`],
                ["Job Tenure:", `${showDetails.tenure}`],

                ["Risk Category", showDetails.riskCategory],
                ["Debt", showDetails.debt],
                ["Employee type:", showDetails.empType],
                ["Loan Purpose:", showDetails.purpose],
                ["Debt Ratio", showDetails.debtRatio],
                ["Reasons:", showDetails.reasons.join(",")],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between border-b pb-2">
                  <span className="font-semibold text-gray-600 ">{label}</span>
                  <span className="font-medium ml-8">{value}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-4 mt-8">
            <Button
              className="flex-1 bg-gray-100 border text-black rounded-lg font-semibold py-2 hover:bg-gray-200"
              onClick={() =>
                navigate("/admin/ViewApplication", { replace: true })
              }
            >
              Back
            </Button>
            <Button
              className="flex-1 bg-black text-white rounded-lg font-semibold py-2 hover:bg-gray-800"
              onClick={() =>
                navigate("/admin/AdminDashboard", { replace: true })
              }
            >
              Done
            </Button>
            <Button
              className="flex-1 bg-black text-white rounded-lg font-semibold py-2 hover:bg-gray-800"
              onClick={() => navigate("/applicant/", { replace: true })}
            >
              Override
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
