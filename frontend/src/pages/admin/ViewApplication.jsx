import { useEffect, useState } from "react";
import { Sidebar } from "../../Components/Sidebar";
import { getApplication } from "../../api/admindashboard";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/ui/Button";

export const ViewApplication = () => {
  const [views, setViews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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
      {/* body */}
      <div className="flex-1 ml-56 pl-12 p-6 overflow-auto">
        <h2 className="font-bold text-2xl mb-6">Loan Applications</h2>
        {/* search bar */}

        <div className="border w-3/4 h-14 mb-5 mt-3 rounded-md border-gray-300 cursor-auto">
          <div className="p-3 ">
            <input
              type="text"
              value={search}
              placeholder="Search....."
              className="outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <p className="mt-6 mb-3 text-lg text-slate-700">
          {views.length} applications
        </p>

        <div className=" border rounded overflow-hidden bg-white">
          <div>
            <table className="min-w-full w-full text-left text-sm ">
              <thead className="bg-gray-50 text-gray-600 uppercase">
                <tr>
                  {["Name", "Amount", "Status", "Actions"].map((a) => (
                    <th
                      key={a}
                      className="p-4 border border-gray-400 text-center"
                    >
                      {a}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                
                {filteredViews.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="p-2 text-gray-500 text-center">
                      No loan applications found
                    </td>
                  </tr>
                ) : (
                  filteredViews.slice(0, page).map((item) => (
                    <tr
                      key={item._id}
                      className="hover-bg-gray-500 cursor-pointer"
                    >
                      <td className="p-4 border border-gray-300">
                        {item.name}
                      </td>

                      <td className="p-4 border border-gray-300">
                        {item.amount}
                      </td>

                      <td className="p-4 border border-gray-300">
                        {item.eligible ? "Approved" : "Rejected"}
                      </td>

                      <td className="p-4 border border-gray-300 text-center">
                        <Button
                          className="text-white bg-teal-800 px-6 py-2 rounded-lg mr-5"
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
                  <td
                    colSpan="8"
                    className="p-4 border border-gray-300 text-gray-500"
                  >
                    <div className="flex gap-2">
                      <p>
                        Showing 1 to {Math.min(views.length, page)} of{" "}
                        {views.length} result{" "}
                        {views.length !== 1 ? "s" : ""}{" "}
                      </p>
                      <div className="flex gap-3">
                        <p>Show:</p>
                        <select
                          className="border rounded-md border-gray-500 "
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
