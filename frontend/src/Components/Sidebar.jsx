import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { GrFormAdd } from "react-icons/gr";
import { MdHistory } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { SiVictoriametrics } from "react-icons/si";
import { AiOutlineMenu } from "react-icons/ai";
import { RiArrowLeftSLine } from "react-icons/ri";

export const Sidebar = () => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  const navClass = ({ isActive }) =>
    `flex p-8 text-xl font-medium cursor-pointer
    ${
      isActive ? "bg-teal-800 text-white" : "hover:bg-gray-100 hover:text-white"
    }`;

  return (
    <div
      className={`${collapsed ? "w-20" : "w-48"} fixed left-0 top-0 border-r h-screen shadow-2xl flex flex-col justify-between bg-white transition-all duration-300 `}
    >
      {/* Top section */}
      <div>
        <div
          className="flex p-4 justify-center items-center"
          onClick={() =>
            navigate(user?.role === "admin" ? "/admin/" : "/applicant/")
          }
        >
          {!collapsed && <img src="/Loan_lens_logo.png" alt="logo" className="w-56 cursor-pointer"></img>}
        </div>
        {/* Toggle button */}
        <div
          className={`p-3 flex ${collapsed ? "justify-center" : "justify-end"}`}
        >
          {collapsed ? (
            <AiOutlineMenu
              size={25}
              className="cursor-pointer text-gray-400"
              onClick={() => setCollapsed(!collapsed)}
            />
          ) : (
            <RiArrowLeftSLine
              size={25}
              className="cursor-pointer"
              onClick={() => setCollapsed(!collapsed)}
            />
          )}
        </div>

        {user.role === "applicant" ? (
          <div>
            {/* new */}
            <NavLink to="/applicant/apply" className={navClass}>
              <div className="flex items-center gap-2">
                <GrFormAdd size={25} className="text-gray-400" />
                {!collapsed && <p>New</p>}
              </div>
            </NavLink>

            {/* history */}
            <NavLink to="/applicant/history" className={navClass}>
              <div className="flex items-center gap-2">
                <MdHistory size={25} className="text-gray-400" />
                {!collapsed && <p>History</p>}
              </div>
            </NavLink>
          </div>
        ) : (
          <div>
            <NavLink to="/admin/applications" className={navClass}>
              <div className="flex items-center gap-2">
                <CiViewList size={25} className="text-gray-400" />
                {!collapsed && <p>View</p>}
              </div>
            </NavLink>

            {/* metrics */}
            <NavLink to="/admin/metrics" className={navClass}>
              <div className="flex items-center gap-2">
                <SiVictoriametrics size={20} className="text-gray-400" />
                {!collapsed && <p>Metrics</p>}
              </div>
            </NavLink>
          </div>
        )}
      </div>

      {/* Profile at bottom */}
      <div className="relative p-4">
        <div
          className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100"
          onClick={() => setShowLogout(!showLogout)}
        >
          <div className="w-9 h-9 rounded-full bg-teal-800 flex items-center justify-center text-white font-bold">
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          {!collapsed && (
            <p className="text-sm font-medium truncate">
              {user?.email.split("@")[0]}
            </p>
          )}
        </div>

        {showLogout && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowLogout(false)}
            />
            <div className="absolute bottom-16 left-14 bg-white border rounded-lg shadow-lg p-2 w-52 z-20">
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
  );
};
