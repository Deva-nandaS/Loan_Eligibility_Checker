import { useState, useEffect } from "react";
import { getLoanHistory } from "../../api/apply";
import { Sidebar } from "../../Components/Sidebar";


export const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getLoanHistory();
        console.log("history:", data);
        setHistory(data);
      } catch (err) {
        console.log("fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">
        <h2 className="text-2xl font-bold mb-4">Loan History</h2>
        <div className="border rounded overflow-hidden bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full w-full text-left border-collapse text-sm">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                <tr>
                  {[
                    "Requested Amount",
                    "Approved Amount",
                    "Annual Interest Rate",
                    "Monthly EMI",
                    "Total Paid",
                    "Interest Paid",
                    "Loan Tenure",
                    "Status",
                  ].map((h)=>(
                    <th key={h} className="p-6 border border-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {history.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="p-4 text-center text-gray-500">
                      No loan applications found
                    </td>
                  </tr>
                ) : (
                  history.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50 cursor-pointer"
                      
                    >
                      <td className="p-4 border border-gray-300">
                        {item.amount}
                      </td>
                      <td className="p-4 border border-gray-300">
                        {item.eligible ? `${item.amount}` : "N/A"}
                      </td>
                      <td className="p-4 border border-gray-300">
                        {item.interestRate ? `${item.interestRate}%` : "N/A"}
                      </td>
                      <td className="p-4 border border-gray-300">
                        {item.emi ? `${item.emi}` : "N/A"}
                      </td>
                      <td className="p-4 border border-gray-300">
                        {item.totalPayable ? `${item.totalPayable}` : "N/A"}
                      </td>
                      <td className="p-4 border border-gray-300">
                        {item.totalInterestPayable
                          ? `${item.totalInterestPayable}`
                          : "N/A"}
                      </td>
                      <td className="p-4 border border-gray-300">
                        {item.loanTenure ? `${item.loanTenure} year` : "N/A"}
                      </td>
                      <td className="p-4 border border-gray-300">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold
                          ${item.eligible ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                        >
                          {item.eligible ? "APPROVED" : "REJECTED"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

              <tfoot>
                <tr>
                  <td
                    colSpan="8"
                    className="p-4 border-t border-gray-300 text-gray-500"
                  >
                    Showing {history.length} result
                    {history.length !== 1 ? "s" : ""}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
