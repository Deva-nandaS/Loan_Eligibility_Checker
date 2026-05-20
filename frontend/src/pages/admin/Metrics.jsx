import { Sidebar } from "../../Components/Sidebar";

export const Metrics = () => {
  return (
    <div className="flex h-screen ">
      <div className="fixed top-0 left-0 h-full">
        <Sidebar />
      </div>

      <div className="flex-1 flex-col p-6 gap-6 ml-64 space-y-8 overflow-auto">
        <h2 className="text-3xl font-bold">Loan Metrics</h2>
        <div>
          <h2 className="text-2xl font-bold mb-4">Eligibility Thresholds </h2>
          <div className="border rounded overflow-hidden bg-white">
            <div className="">
              <table className="min-w-full w-full text-left border-collapse text-sm">
                <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                  <tr>
                    {[
                      "MIN_AGE",
                      "MAX_AGE",
                      "MIN_MONTHLY_INCOME",
                      "MAX_DEBT_TO_INCOME_RATIO",
                      "MIN_CREDIT_SCORE",
                      "MAX_LOAN_MULTIPLIER",
                      "MIN_JOB_TENURE_YEARS",
                    ].map((h) => (
                      <th key={h} className="px-3 py-2 border border-gray-400">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="px-3 py-2 border border-gray-300">21</td>
                    <td className="px-3 py-2 border border-gray-300">65</td>
                    <td className="px-3 py-2 border border-gray-300">15000</td>
                    <td className="px-3 py-2 border border-gray-300">0.4</td>
                    <td className="px-3 py-2 border border-gray-300">650</td>
                    <td className="px-3 py-2 border border-gray-300">10</td>
                    <td className="px-3 py-2 border border-gray-300">1</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex-1 flex-col p-6 gap-6 overflow-auto">
          <h2 className="text-2xl font-bold mb-4">
            Interest Rate Matrix (by Credit Score){" "}
          </h2>
          <div className="border rounded overflow-hidden bg-white">
            <div className="">
              <table className="min-w-full w-full text-left border-collapse text-sm">
                <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                  <tr>
                    {[
                      "Credit Score Range",
                      "Base Interest Rate(Annual)",
                      "Risk Category",
                    ].map((h) => (
                      <th key={h} className="px-3 py-2 border border-gray-400">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="px-3 py-2 border border-gray-300">
                      800 to 900
                    </td>
                    <td className="px-3 py-2 border border-gray-300">8.5%</td>
                    <td className="px-3 py-2 border border-gray-300">
                      Excellent
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border border-gray-300">
                      750 to 799
                    </td>
                    <td className="px-3 py-2 border border-gray-300">10.0%</td>
                    <td className="px-3 py-2 border border-gray-300">Good</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border border-gray-300">
                      700 to 749
                    </td>
                    <td className="px-3 py-2 border border-gray-300">12.5%</td>
                    <td className="px-3 py-2 border border-gray-300">Fair</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border border-gray-300">
                      650 to 699
                    </td>
                    <td className="px-3 py-2 border border-gray-300">15.0%</td>
                    <td className="px-3 py-2 border border-gray-300">
                      Below Average
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border border-gray-300">
                      Below 650
                    </td>
                    <td className="px-3 py-2 border border-gray-300">
                      Rejected
                    </td>
                    <td className="px-3 py-2 border border-gray-300">
                      High Risk
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Employment Type Multipliers */}
        <div className="flex-1 flex-col p-6 gap-6 overflow-auto">
          <h2 className="text-2xl font-bold mb-4">
            Employment Type Multipliers{" "}
          </h2>
          <div className="border rounded overflow-hidden bg-white mt-6">
            <table className="min-w-full w-full text-left border-collapse text-sm">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                <tr>
                  {["Employment Type", "Rate Adjustment", "Notes"].map((h) => (
                    <th key={h} className="px-3 py-2 border border-gray-400">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 py-2 border border-gray-300">Salaried</td>
                  <td className="px-3 py-2 border border-gray-300">+0%</td>
                  <td className="px-3 py-2 border border-gray-300">
                    Base rate
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border border-gray-300">
                    Self-Employed
                  </td>
                  <td className="px-3 py-2 border border-gray-300">+1.5%</td>
                  <td className="px-3 py-2 border border-gray-300">
                    Slightly higher risk
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border border-gray-300">
                    Freelance
                  </td>
                  <td className="px-3 py-2 border border-gray-300">+2.5%</td>
                  <td className="px-3 py-2 border border-gray-300">
                    Income volatility considered
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border border-gray-300">
                    Unemployed
                  </td>
                  <td className="px-3 py-2 border border-gray-300">
                    Auto-Rejected
                  </td>
                  <td className="px-3 py-2 border border-gray-300">
                    Not eligible regardless of other factors
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Loan Purpose Multipliers */}
        <div className="flex-1 flex-col p-6 gap-6 overflow-auto">
          <h2 className="text-2xl font-bold mb-4">Loan Purpose Multipliers </h2>
          <div className="border rounded overflow-hidden bg-white mt-6">
            <table className="min-w-full w-full text-left border-collapse text-sm">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                <tr>
                  {["Loan Purpose", "Rate Adjustment"].map((h) => (
                    <th key={h} className="px-3 py-2 border border-gray-400">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 py-2 border border-gray-300">Home</td>
                  <td className="px-3 py-2 border border-gray-300">
                    -0.5% (discount)
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border border-gray-300">
                    Education
                  </td>
                  <td className="px-3 py-2 border border-gray-300">
                    -0.25% (discount)
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border border-gray-300">Vehicle</td>
                  <td className="px-3 py-2 border border-gray-300">+0%</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border border-gray-300">Business</td>
                  <td className="px-3 py-2 border border-gray-300">+1.0%</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border border-gray-300">Personal</td>
                  <td className="px-3 py-2 border border-gray-300">+1.5%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
