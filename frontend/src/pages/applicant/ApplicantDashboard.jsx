import { useEffect } from "react";
import { PiSpinnerGap } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";

import { Sidebar } from "../../Components/Sidebar";
import { fetchLoanHistory } from "../../redux/slices/loanSlice";

const Card = ({ label, value, color }) => {
  return (
    <div className="border rounded-lg border-t-teal-800 border-t-8 p-6 text-xl">
      <p className="text-gray-500 text-sm font-medium">{label}</p>
      <p className={`font-bold text-3xl mt-2 ${color}`}>{value}</p>
    </div>
  );
};

export const ApplicantDashboard = () => {
  const { data, loading, error } = useSelector((state) => state.loan);
  const { collapsed } = useSelector((state) => state.sidebar);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLoanHistory());
  }, [dispatch]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <PiSpinnerGap size={34} className="animate-spin" />
        <p>Loading..</p>
      </div>
    );

  if (error) return <div>{error}</div>;

  const details = {
    name: user?.name || "User",
    loanCount: data.length,
    approvedCount: data.filter((loan) => loan.eligible).length,
    rejectedCount: data.filter((loan) => !loan.eligible).length,
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div
        className={`flex-1 transition-all duration-300 mt-5 p-4 md:p-6 overflow-y-auto ${collapsed ? "ml-20" : "ml-56"}`}
      >
        <div className="flex gap-2 items-center justify-center">
          <h2 className="text-2xl font-bold mb-6">Welcome</h2>
          <h2 className="uppercase text-2xl mb-6 font-bold text-teal-800">
            {details.name} !
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
