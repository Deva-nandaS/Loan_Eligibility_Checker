import { Sidebar } from "../../Components/Sidebar";

export const Metrics = () => {
  const fix = [
    "MIN_AGE",
    "MAX_AGE",
    "MIN_MONTHLY_INCOME",
    "MAX_DEBT_TO_INCOME_RATIO",
    "MIN_CREDIT_SCORE",
    "MAX_LOAN_MULTIPLIER",
    "MIN_JOB_TENURE_YEARS",
  ];

  const irm = [
    "Credit Score Range",
    "Base Interest Rate(Annual)",
    "Risk Category",
  ];

  const etm = ["Employment Type", "Rate Adjustment", "Notes"];
  const lpm = ["Loan Purpose", "Rate Adjustment"];

  const TableSection = ({ title, headers, children }) => (
    <div className="flex-1 flex-col p-6 gap-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="border rounded overflow-hidden bg-white mt-6">
        <div className="overflow-x-auto">
          <table className="metrics-table min-w-full w-full text-left border-collapse text-sm">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
              <tr>
                {headers.map((h) => (
                  <th key={h} className="px-3 py-2 border border-gray-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>{children}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="fixed top-0 left-0 h-full">
        <Sidebar />
      </div>

      <div className="ml-56 flex-1 overflow-y-auto h-screen p-6 space-y-8">
        <h2 className="text-3xl font-bold">Loan Metrics</h2>

        <TableSection title="Eligibility Thresholds" headers={fix}>
          <tr>
            <td>21</td>
            <td>65</td>
            <td>15000</td>
            <td>0.4</td>
            <td>650</td>
            <td>10</td>
            <td>1</td>
          </tr>
        </TableSection>

        <TableSection
          title="Interest Rate Matrix (by Credit Score)"
          headers={irm}
        >
          {" "}
          <tr>
            <td>800 to 900</td>
            <td>8.5%</td>
            <td>Excellent</td>
          </tr>
          <tr>
            <td>750 to 799</td>
            <td>10.0%</td>
            <td>Good</td>
          </tr>
          <tr>
            <td>700 to 749</td>
            <td>12.5%</td>
            <td>Fair</td>
          </tr>
          <tr>
            <td>650 to 699</td>
            <td>15.0%</td>
            <td>Below Average</td>
          </tr>
          <tr>
            <td>Below 650</td>
            <td>Rejected</td>
            <td>High Risk</td>
          </tr>
        </TableSection>

        {/* Employment Type Multipliers */}
        <TableSection title=" Employment Type Multipliers" headers={etm}>
          <tr>
            <td>Salaried</td>
            <td>+0%</td>
            <td>Base rate</td>
          </tr>
          <tr>
            <td>Self-Employed</td>
            <td>+1.5%</td>
            <td>Slightly higher risk</td>
          </tr>
          <tr>
            <td>Freelance</td>
            <td>+2.5%</td>
            <td>Income volatility considered</td>
          </tr>
          <tr>
            <td>Unemployed</td>
            <td>Auto-Rejected</td>
            <td>Not eligible regardless of other factors</td>
          </tr>
        </TableSection>
        {/* Loan Purpose Multipliers */}
        <TableSection title="Loan Purpose Multipliers" headers={lpm}>
          <tr>
            <td>Home</td>
            <td>-0.5% (discount)</td>
          </tr>
          <tr>
            <td>Education</td>
            <td>-0.25% (discount)</td>
          </tr>
          <tr>
            <td>Vehicle</td>
            <td>+0%</td>
          </tr>
          <tr>
            <td>Business</td>
            <td>+1.0%</td>
          </tr>
          <tr>
            <td>Personal</td>
            <td>+1.5%</td>
          </tr>
        </TableSection>
      </div>
    </div>
  );
};
