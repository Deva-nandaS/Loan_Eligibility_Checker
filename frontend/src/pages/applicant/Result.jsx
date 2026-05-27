import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "../../Components/ui/Button";
import { getLoanResult } from "../../api/apply";
import { Sidebar } from "../../Components/Sidebar";

export const Result = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getLoanResult(id);
        setResult(data);
      } catch (err) {
        navigate("/applicant/apply", { replace: true });
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id,navigate]);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-black font-bold">
        Loading....
      </div>
    );
  if (!result) return null;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex  ml-48 justify-center items-center p-6">
        <div
          className={`bg-white fixed  rounded-xl shadow-2xl p-8 w-full max-w-lg border
          ${result.eligible ? "border-green-500" : "border-red-500"}`}
        >
          {result.eligible ? (
            <div className="space-y-3">
              <h4 className="text-2xl text-green-700 font-bold text-center mb-6">
                {" "}
                APPROVED
              </h4>
              {[
                ["Applicant", result.name],
                ["Requested Amount", `${result.amount}`],
                ["Approved Amount", `${result.amount}`],
                ["Annual Interest Rate", `${result.interestRate}%`],
                ["Monthly EMI", `${result.emi}`],
                ["Total Payable", `${result.totalPayable}`],
                ["Total Interest Payable", `${result.totalInterestPayable}`],
                ["Risk Category", result.riskCategory],
                ["Debt Ratio", result.debtRatio],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between border-b pb-2">
                  <span className="font-semibold text-gray-600">{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
              
            </div>
          ) : (
            <div className="space-y-3">
              <h4 className="text-2xl text-red-700 font-bold text-center mb-6">
                {" "}
                REJECTED
              </h4>
              <div className="flex justify-between  pb-2">
                <span className="font-semibold text-gray-600">Reason</span>
                <span className="font-medium">{result.reasons?.[0]}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="font-semibold text-gray-600">
                  Reapply After
                </span>
                <span className="font-medium">90 days</span>
              </div>
              <div className="mt-2">
                <p className="font-semibold text-gray-600 mb-2">Suggestions</p>
                {result.suggestions?.map((s, i) => (
                  <p key={i} className="text-sm text-gray-600">
                    - {s}
                  </p>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-8">
            <Button
              className="flex-1 bg-teal-800 border text-white rounded-lg font-semibold py-2"
              onClick={() => navigate("/applicant/apply",  {state:{name:result.name,age:result.age},replace: true })}
            >
              Apply Again
            </Button>
            <Button
              className="flex-1 bg-teal-800 text-white rounded-lg font-semibold py-2 "
              onClick={() =>
                navigate("/applicant/", { replace: true })
              }
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
