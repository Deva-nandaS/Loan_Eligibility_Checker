import { useSelector } from "react-redux";

import { Sidebar } from "../../Components/Sidebar";
import {
  ELIGIBILITY_THRESHOLDS,
  INTEREST_RATE_MATRIX,
  EMPLOYMENT_MULTIPLIERS,
  LOAN_PURPOSE_MULTIPLIERS,
} from "../../constants";

const TableSection = ({ title, headers, children }) => (
  <div className="w-full">
    <h2 className="text-xl md:text-2xl font-bold mb-4">{title}</h2>

    <div className="border rounded bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="metrics-table min-w-[600px] w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
            <tr>
              {headers.map((h) => (
                <th
                  key={h}
                  className="px-3 py-2 border border-gray-300 whitespace-nowrap"
                >
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
);
export const Metrics = () => {
   const { collapsed } = useSelector((state) => state.sidebar);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="fixed top-0 left-0 h-full">
        <Sidebar />
      </div>
      <div className={`flex-1 duration-300 overflow-y-auto h-screen p-4 md:p-6 space-y-8 transition-[margin] ${collapsed? "ml-20":"ml-56 "}`}>
        
        <h2 className="text-2xl md:text-3xl font-bold">Loan Metrics</h2>

        <TableSection
          title="Eligibility Thresholds"
          headers={Object.keys(ELIGIBILITY_THRESHOLDS)}
        >
          <tr>
            {Object.values(ELIGIBILITY_THRESHOLDS).map((h) => (
              <td key={h}>{h}</td>
            ))}
          </tr>
        </TableSection>

        <TableSection
          title="Interest Rate Matrix(by credit score)"
          headers={[
            "Credit Score Range",
            "Base Interest Rate",
            "Risk Category",
          ]}
        >
          {INTEREST_RATE_MATRIX.map((h) => (
            <tr key={h.range}>
              <td>{h.range}</td>
              <td>{h.rate}</td>
              <td>{h.risk}</td>
            </tr>
          ))}
        </TableSection>

        {/* Employment Type Multipliers */}
        <TableSection
          title="Employment Type Multipliers"
          headers={["Employment Type ", "Rate Adjustment ", "Notes"]}
        >
          {EMPLOYMENT_MULTIPLIERS.map((h) => (
            <tr key={h.type}>
              <td>{h.type}</td>
              <td>{h.adjustment}</td>
              <td>{h.note}</td>
            </tr>
          ))}
        </TableSection>

        {/* Loan Purpose Multipliers */}
        <TableSection
          title="Loan Purpose Multipliers"
          headers={["Loan Purpose ", "Rate Adjustment"]}
        >
          {LOAN_PURPOSE_MULTIPLIERS.map((h) => (
            <tr key={h.purpose}>
              <td>{h.purpose}</td>
              <td>{h.adjustment}</td>
            </tr>
          ))}
        </TableSection>
      </div>
    </div>
  );
};
