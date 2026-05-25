import { useState, useEffect } from "react";
import { getLoanHistory } from "../../api/apply";
import { Sidebar } from "../../Components/Sidebar";
import { IoCloseSharp } from "react-icons/io5";
import { PiSpinnerGap } from "react-icons/pi";

export const History = ({ onClose }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProblem, setShowProblem] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [page, setPage] = useState(5);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getLoanHistory();
        await new Promise(resolve=>setTimeout(resolve,2000))
        setHistory(data);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const filteredHistory = history.filter((item) =>
    item?.amount?.toString().includes(search),
  );

  if (loading)
    return (
      <div className="flex gap-2 h-screen items-center justify-center">
        <PiSpinnerGap size={60} className="animate-spin text-teal-900"/>
        <span className="font-bold text-3xl text-teal-900">Loading....</span>
      </div>
    );

  return (
    <div className="flex h-screen fixed overflow-hidden">
      <Sidebar />
      {/* body */}

      <div className="flex-1 p-6 pl-12 ml-56 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Loan History</h2>

        <div className="border border-gray w-3/4 h-14 rounded-md mt-3 mb-5 cursor-auto">
          <div className="p-3 ">
            <input
              type="text"
              value={search}
              placeholder="Search..."
              className="outline-none w-full"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className=" mt-6 text-lg text-slate-700">
            {" "}
            <p>
              {history.length} application{history.length!==1?"s" : ""}
            </p>
          </div>
        </div>
        <div className="border rounded overflow-hidden bg-white mt-20">
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
                {filteredHistory.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="p-4 text-center text-gray-500">
                      No loan applications found
                    </td>
                  </tr>
                ) : (
                  filteredHistory.slice(0, page).map((item) => (
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
                            if (
                              item.reasons?.length > 0 ||
                              item.suggestions?.length > 0
                            ) {
                              //only if there are reasons and suggestions by admin in case of approval.
                              setSelectedItem(item);
                              setShowProblem(true);
                            } else {
                              setShowProblem(false);
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
                    <div className="flex gap-2">
                      <p>
                        Showing 1 to {Math.min(page, history.length)} of{" "}
                        {history.length} result
                        {history.length !== 1 ? "s" : ""}
                      </p>
                      <div className="flex gap-3 ">
                        <p>Show:</p>
                        <select
                          className="border rounded-md border-gray-500"
                          value={page}
                          onChange={(e) => setPage(Number(e.target.value))}
                        >
                          <option value={5}>5</option>
                          <option value={10}>10</option>
                          <option value={20}>20</option>
                          <option value={30}>30</option>
                        </select>
                        <p>per page</p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      {showProblem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className=" bg-white shadow-2xl w-[600px] max-h-[80vh] rounded-xl border">
            <div className="flex flex-col p-3 gap-3">
              <div className="flex justify-between items-center border-b ">
                <h2 className=" font-bold mb-3">Why?</h2>
                <div className="">
                  <button
                    onClick={() => setShowProblem(false)}
                    className=" bg-red-700 text-white rounded hover:bg-red-800"
                  >
                    <IoCloseSharp />
                  </button>
                </div>
              </div>

              <div className="flex justify-between flex-col ">
                <label className="font-semibold">Reason:</label>
                <div className="border p-3 bg-gray-200">
                  {selectedItem?.reasons.map((e, i) => (
                    <p key={i}>{e}</p>
                  ))}
                </div>
              </div>
              <div className="flex justify-between flex-col">
                <label className="font-semibold">Suggestions:</label>
                <div className="border p-3 bg-gray-200">
                  {selectedItem?.suggestions.map((e, i) => (
                    <p key={i}>{e}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
