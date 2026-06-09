import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Sidebar } from "../../Components/Sidebar";
import { getApplication } from "../../api/admindashboard";
import { Button } from "../../Components/ui/Button";

export const ViewApplication = () => {
  const { collapsed } = useSelector((state) => state.sidebar);
  const navigate = useNavigate();
  const [views, setViews] = useState([]);
  const [page, setPage] = useState(5);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getApplication();
        setViews(data);
      } catch (err) {}
    };
    fetchData();
  }, []);

  const filteredViews = views.filter((item) =>
    item?.name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex overflow-hidden h-screen">
      <Sidebar />
      <div
        className={`flex-1 transition-all duration-300 mt-5 p-4 md:p-6 overflow-y-auto ${collapsed ? "ml-24" : "ml-56"}`}
      >
        <h2 className="font-bold text-xl md:text-2xl mb-6">
          Loan Applications
        </h2>

        <div className="border w-full md:w-3/4 h-12 md:h-14 mb-5 mt-3 rounded-md border-gray-300">
          <div className="p-3">
            <input
              type="text"
              value={search}
              placeholder="Search....."
              className="outline-none w-full"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <p className="mt-6 mb-3 text-lg text-slate-700">
          {views.length} applications
        </p>

        <div className="border rounded overflow-hidden bg-white">
          <div className="overflow-x-auto scrollbar-thin">
            <table className="view-table min-w-[600px] w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase">
                <tr>
                  {["Name", "Amount", "Status", "Actions"].map((a) => (
                    <th key={a}>{a}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredViews.length === 0 ? (
                  <tr>
                    <td colSpan="8">No loan applications found</td>
                  </tr>
                ) : (
                  filteredViews.slice(0, page).map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>{item.amount}</td>
                      <td>{item.eligible ? "Approved" : "Rejected"}</td>
                      <td className="flex items-center justify-center">
                        <Button
                          className="text-white bg-teal-800 px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm"
                          onClick={() =>
                            navigate(`/admin/applications/${item._id}`, {
                              replace: true,
                            })
                          }
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <p>
                        Showing to {Math.min(views.length, page)} of{" "}
                        {views.length} result{views.length !== 1 ? "s" : ""}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p>Show:</p>
                        <select
                          className="border rounded-md border-gray-500"
                          value={page}
                          onChange={(e) => setPage(Number(e.target.value))}
                        >
                          <option value={5}>5</option>
                          <option value={10}>10</option>
                          <option value={15}>15</option>
                          <option value={20}>20</option>
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
    </div>
  );
};
