import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getAdminDashboard } from "../../api/admindashboard";
import { Sidebar } from "../../Components/Sidebar";

const Card = ({ label, value, color }) => {
  return (
    <div className="border rounded-lg border-t-teal-800 border-t-8 p-6 text-xl">
      <p className="text-gray-500 text-sm font-medium">{label}</p>
      <p className={`font-bold text-3xl mt-2 ${color}`}>{value}</p>
    </div>
  );
};

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
    <div className="flex h-screen fixed overflow-hidden">
      <Sidebar />
      <div className="flex-1 ml-64 p-6 mt-5 pl-5 overflow-y-auto">
        <div className="flex items-center justify-center">
          <h2 className="text-2xl font-bold mb-6">Welcome !</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card label="TOTAL USERS" value={details.userCount} color="" />
          <Card label="TOTAL APPLICATIONS" value={details.loanCount} color="" />
          <Card
            label="APPROVED APPLICATIONS"
            value={details.approvedCount}
            color="text-green-600"
          />
          <Card
            label="REJECTED APPLICATIONS"
            value={details.rejectedCount}
            color="text-red-600"
          />
        </div>
      </div>
    </div>
  );
};
