import { Navigate, useNavigate } from "react-router-dom";
export const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* {sidebar} */}
      <div className="w-56 border-r h-screen border-black">
        {/* new */}
        <div
          className="flex p-8 text-xl font-medium cursor-pointer"
          onClick={() => navigate("/applicant/apply")}
        >
          <p>New</p>
        </div>
        {/* history */}
        <div
          className="flex p-8 text-xl font-medium cursor-pointer"
          onClick={() => navigate("/history")}
        >
          <p>History</p>
        </div>
      </div>
    </div>
  );
};
