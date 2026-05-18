import { useEffect, useState } from "react";
import { Sidebar } from "../../Components/Sidebar";
import { getApplication } from "../../api/admindashboard";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/ui/Button";

export const ViewApplication = () => {
  const [views, setViews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getApplication();
        console.log("data:", data);
        setViews(data);
      } catch (err) {
        console.log("Error", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">
        <h2 className="font-bold text-2xl mb-6">Loan Applications</h2>
        <div className=" border rounded overflow-hidden bg-white">
          <div className="">
            <table className="min-w-full w-full text-left text-sm ">
              <thead className="bg-gray-50 text-gray-600 uppercase">
                <tr>
                  {["Name", "Amount", "Status", "Actions"].map((a) => (
                    <th key={a} className="p-4 border border-gray-400">
                      {a}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {views.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="p-2 text-gray-500 text-center">
                      No loan applications found
                    </td>
                  </tr>
                ) : (
                  views.map((item) => (
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
                          className="text-white bg-black p-3 rounded-lg mr-5"
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
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
