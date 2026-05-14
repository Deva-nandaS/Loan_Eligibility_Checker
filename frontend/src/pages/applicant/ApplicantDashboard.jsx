import { Sidebar } from "../../Components/Sidebar";

export const ApplicantDashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden relative ">
      <Sidebar />

      {/* right content */}
      <div className="flex-1 flex justify-center mt-7">
        <h1 className="text-2xl">Welcome ...</h1>
      </div>
    </div>
  );
};
