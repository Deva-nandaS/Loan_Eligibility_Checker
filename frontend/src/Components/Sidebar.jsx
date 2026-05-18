import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    console.log("logging out");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("token after:", localStorage.getItem("token"));
    navigate("/");
  };

  return (
    <div>
      <div className="w-56 border-r h-screen border-black flex flex-col justify-between">
        {user.role==="applicant"?
        (
          <div>
            <div
              className="flex p-8 text-xl font-medium cursor-pointer hover:bg-gray-100"
              onClick={() => navigate("/applicant/apply")}
            >
              <p>New</p>
            </div>
            <div
              className="flex p-8 text-xl font-medium cursor-pointer hover:bg-gray-100"
              onClick={() => navigate("/applicant/history")}
            >
              <p>History</p>
            </div>
          </div>
        ):(
     
          <div>
            <div
              className="flex p-8 text-xl font-medium cursor-pointer hover:bg-gray-100"
              onClick={() => navigate("/admin/viewApplication")}
            >
              <p>View</p>
            </div>
            <div
              className="flex p-8 text-xl font-medium cursor-pointer hover:bg-gray-100"
              onClick={() => navigate("/admin/metrics")}
            >
              <p>Metrics</p>
            </div>
          </div>

        )}
  
        
        {/* Profile button at bottom */}
        <div className="relative p-4">
          <div
            className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => setShowLogout(!showLogout)}
          >
            <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white font-bold">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <p className="text-sm font-medium truncate">{user?.email}</p>
          </div>

          {/* Logout popup */}
          {showLogout && (
            <div className="absolute bottom-16 left-4 bg-white border rounded-lg shadow-lg p-2 w-40">
              <p
                className="text-red-500 font-medium cursor-pointer p-2 hover:bg-gray-100 rounded"
                onClick={handleLogout}
              >
                Logout
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
