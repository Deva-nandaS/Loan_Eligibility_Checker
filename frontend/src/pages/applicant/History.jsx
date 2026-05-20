import { useState, useEffect } from "react";
import { getLoanHistory } from "../../api/apply";
import { Sidebar } from "../../Components/Sidebar";
import { IoCloseSharp } from "react-icons/io5";

export const History = ({ onClose }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProblem, setShowProblem] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getLoanHistory();
      
        setHistory(data);
      } catch (err) {
     
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
                  ].map((h) => (
                    <th key={h} className="p-6 border border-gray-400">
                      {h}
                    </th>
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
                        {item.loanTenure ? `${item.loanTenure} months` : "N/A"}
                      </td>
                      <td className="p-4 border border-gray-300">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold
                         
                          ${item.eligible ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                          onClick={() => {
                            if (!item.eligible) {
                              setSelectedItem(item);
                              setShowProblem(true);
                            }
                          }}
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
      {showProblem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="border bg-white shadow-2xl w-96 h-56 rounded-xl">
            <div className="flex flex-col p-3 gap-3">
              <div className="flex justify-between items-center border-b rounded-t-lg">
                <h2 className=" font-bold">Why?</h2>
                <button
                  onClick={() => setShowProblem(false)}
                  className="p-2 bg-red-700 text-white rounded hover:bg-red-800"
                >
                  <IoCloseSharp />
                </button>
              </div>
              <div className="flex justify-between">
                <label className="font-semibold">Reason:</label>
                <p>{selectedItem?.reasons?.join(",")}</p>
              </div>
              <div className="flex justify-between">
                <label className="font-semibold">Suggestions:</label>
                <p>{selectedItem?.suggestions?.join(",")}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
