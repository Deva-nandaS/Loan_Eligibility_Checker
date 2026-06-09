import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "../../Components/ui/Button";
import { Sidebar } from "../../Components/Sidebar";
import { getResultThunk } from "../../redux/slices/loanSlice";

const Card = ({ label, value }) => (
  <div key={label} className="flex justify-between border-b pb-2">
    <span className="font-semibold text-gray-600">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export const Result = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, result } = useSelector((state) => state.loan);

  useEffect(() => {
    dispatch(getResultThunk(id));
  }, [dispatch]);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-black font-bold">
        Loading....
      </div>
    );
  if (!result) return null;

  const success = [
    { label: "Applicant", value: result.name },
    { label: "Requested Amount", value: result.amount },
    { label: "Approved Amount", value: result.amount },
    { label: "Annual Interest Rate", value: `${result.interestRate}%` },
    { label: "Monthly EMI", value: result.emi },
    { label: "Total Payable", value: result.totalPayable },
    { label: "Total Interest Payable", value: result.totalInterestPayable },
    { label: "Risk Category", value: result.riskCategory },
    { label: "Debt Ratio", value: result.debtRatio },
  ];
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex ml-16 md:ml-48 justify-center items-center p-4 md:p-6">
        <div
          className={`bg-white rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-lg border
          ${result.eligible ? "border-green-500" : "border-red-500"}`}
        >
          {result.eligible ? (
            <div className="space-y-3">
              <h4 className="text-2xl text-green-700 font-bold text-center mb-6">
                APPROVED
              </h4>
              {success.map(({ label, value }) => (
                <Card key={label} label={label} value={value} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <h4 className="text-2xl text-red-700 font-bold text-center mb-6">
                REJECTED
              </h4>
              <Card label="Reason" value={result.reasons?.[0]} />
              <Card label="Reapply after" value="90 days" />
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
              onClick={() =>
                navigate("/applicant/apply", {
                  state: { name: result.name, age: result.age },
                  replace: true,
                })
              }
            >
              Apply Again
            </Button>
            <Button
              className="flex-1 bg-teal-800 text-white rounded-lg font-semibold py-2"
              onClick={() => navigate("/applicant/", { replace: true })}
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
