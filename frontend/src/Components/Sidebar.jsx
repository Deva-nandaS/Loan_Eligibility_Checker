import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GrFormAdd } from "react-icons/gr";
import { MdHistory } from "react-icons/md";

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
      <div className="w-56 border-r h-screen shadow-2xl flex flex-col justify-between bg-white">
        {user.role === "applicant" ? (
          <div>
            <div
              className="flex p-8 text-xl font-medium cursor-pointer hover:bg-teal-800"
              onClick={() => navigate("/applicant/apply")}
            ><div className="flex items-center gap-2 ">
              <GrFormAdd size={25} />
              <p>New</p>
              </div>
            </div>
            <div
              className="flex p-8 text-xl font-medium cursor-pointer hover:bg-teal-800"
              onClick={() => navigate("/applicant/history")}
            >
              <div className="flex items-center gap-2 ">
                   <MdHistory size={25}/>
              <p>History</p>
           
              </div>
            </div>
          </div>
        ) : (
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
           <div className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => setShowLogout(!showLogout)}
          >
            <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white font-bold">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <p className="text-sm font-medium truncate">{user?.email}</p>
          </div>

          {/* Logout popup */}
        {showLogout && (
  <>
    <div className="fixed inset-0 z-10" onClick={() => setShowLogout(false)} />
    <div className="absolute bottom-16 left-60 bg-white border rounded-lg shadow-lg p-2 w-52 z-20">
      <div className="border rounded-md bg-teal-800">
        <p
          className="cursor-pointer p-2 rounded font-semibold text-white"
          onClick={() => navigate("/changepassword")}
        >
          Change Password
        </p>
      </div>
      <div className="border rounded-md bg-teal-800 font-bold text-white mt-3">
        <p
          className="font-semibold cursor-pointer p-2 rounded text-white"
          onClick={handleLogout}
        >
          Logout
        </p>
      </div>
    </div>
  </>
)}
        </div>
      </div>
    </div>
  );
};
