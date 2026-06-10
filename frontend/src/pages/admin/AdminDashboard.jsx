import { useEffect } from "react";
import { toast } from "react-toastify";
import { PiSpinnerGap } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";

import { Sidebar } from "../../Components/Sidebar";
import { adminDashboardThunk } from "../../redux/slices/adminSlice";

const Card = ({ label, value, color }) => {
  return (
    <div className="border rounded-lg border-t-teal-800 border-t-8 p-6 text-xl">
      <p className="text-gray-500 text-sm font-medium">{label}</p>
      <p className={`font-bold text-3xl mt-2 ${color}`}>{value}</p>
    </div>
  );
};

export const AdminDashboard = () => {
  const { collapsed } = useSelector((state) => state.sidebar);
  const { loading, error, data, message } = useSelector((state) => state.admin);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminDashboardThunk());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
  }, [message]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading)
    return (
      <div className="flex gap-2 h-screen items-center justify-center">
        <PiSpinnerGap size={60} className="animate-spin text-teal-900" />
        <span className="font-bold text-3xl text-teal-900">Loading....</span>
      </div>
    );

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div
        className={`flex-1 transition-all duration-300 mt-5 p-4 md:p-6 overflow-y-auto ${collapsed ? "ml-24 mr-10" : "ml-56"}`}
      >
        <div className="flex items-center justify-center">
          <h2 className="text-2xl font-bold mb-6">Welcome !</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card label="TOTAL USERS" value={data?.userCount} color="" />
          <Card label="TOTAL APPLICATIONS" value={data?.loanCount} color="" />
          <Card
            label="APPROVED APPLICATIONS"
            value={data?.approvedCount}
            color="text-green-600"
          />
          <Card
            label="REJECTED APPLICATIONS"
            value={data?.rejectedCount}
            color="text-red-600"
          />
        </div>
      </div>
    </div>
  );
};
