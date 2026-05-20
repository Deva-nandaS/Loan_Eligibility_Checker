import { useEffect, useState } from "react";
import { getAdminDashboard } from "../../api/admindashboard";
import { toast } from "react-toastify";
import { Sidebar } from "../../Components/Sidebar";

export const AdminDashboard = () => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getAdminDashboard();

        setDetails(data.data);
      } catch (err) {
        toast.error("Fetch error");
      }
    };
    fetch();
  }, []);

  if (!details) return <div>Loading...</div>;

 return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">
        <div className="flex gap-2 items-center justify-center">
          <h2 className="text-2xl font-bold mb-6">Welcome !</h2>
         
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           <div className="border rounded-lg border-t-teal-800 border-t-8 p-6 text-xl">
            <p className="text-gray-500 text-sm font-medium">
              TOTAL USERS
            </p>
            <p className="font-bold text-3xl mt-2">{details.userCount}</p>
          </div>
          <div className="border rounded-lg border-t-teal-800 border-t-8 p-6 text-xl">
            <p className="text-gray-500 text-sm font-medium">
              TOTAL APPLICATIONS
            </p>
            <p className="font-bold text-3xl mt-2">{details.loanCount}</p>
          </div>
          <div className="border rounded-lg border-t-teal-800 border-t-8 p-6 text-xl">
            <p className="text-gray-500 text-sm font-medium">
              APPROVED APPLICATIONS
            </p>
            <p className="font-bold text-3xl mt-2 text-green-600">
              {details.approvedCount}
            </p>
          </div>
          <div className="border rounded-lg border-t-teal-800 border-t-8 p-6 text-xl">
            <p className="text-gray-500 text-sm font-medium">
              REJECTED APPLICATIONS:
            </p>
            <p className="font-bold text-3xl mt-2 text-red-600">
              {details.rejectedCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


