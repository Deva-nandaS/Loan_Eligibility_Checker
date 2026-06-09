import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { GrFormAdd } from "react-icons/gr";
import { MdHistory } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { SiVictoriametrics } from "react-icons/si";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../redux/slices/authSlice";
import { toggleSidebar } from "../redux/slices/sidebarSlice";

export const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { collapsed } = useSelector((state) => state.sidebar);

  const [showLogout, setShowLogout] = useState(false);

  const handleToggleSidebar = () => dispatch(toggleSidebar());

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/", { replace: true });
  };

  const navClass = ({ isActive }) =>
    `flex items-center px-4 py-3 mx-2 rounded-xl font-medium transition-all duration-200
    ${
      isActive
        ? "bg-teal-800 text-white shadow-md"
        : "text-gray-700 hover:bg-teal-50 hover:text-teal-800"
    }`;

  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-56"
      } fixed left-0 top-0 h-screen border-r border-gray-200 bg-white shadow-lg flex flex-col justify-between transition-all duration-300 z-50`}
    >
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div
          className="flex justify-center items-center py-5 border-b border-gray-100 cursor-pointer"
          onClick={() =>
            navigate(user?.role === "admin" ? "/admin" : "/applicant")
          }
        >
          {!collapsed ? (
            <img
              src="/Loan_lens_logo.png"
              alt="logo"
              className="w-36 object-contain"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-teal-800 text-white flex items-center justify-center font-bold">
              L
            </div>
          )}
        </div>

        {/* Toggle */}
        <div
          className={`flex ${
            collapsed ? "justify-center" : "justify-end"
          } px-4 py-3`}
        >
          {collapsed ? (
            <AiOutlineMenu
              size={22}
              className="cursor-pointer text-gray-500 hover:text-teal-800"
              onClick={handleToggleSidebar}
            />
          ) : (
            <AiOutlineClose
              size={22}
              className="cursor-pointer text-gray-500 hover:text-teal-800"
              onClick={handleToggleSidebar}
            />
          )}
        </div>

        {/* Menu */}
        <div className="mt-3 flex flex-col gap-2">
          {user?.role === "applicant" ? (
            <>
              <NavLink to="/applicant/apply" className={navClass}>
                <div
                  className={`flex items-center w-full ${
                    collapsed ? "justify-center" : "gap-3"
                  }`}
                >
                  <GrFormAdd size={22} />
                  {!collapsed && <span>New Application</span>}
                </div>
              </NavLink>

              <NavLink to="/applicant/history" className={navClass}>
                <div
                  className={`flex items-center w-full ${
                    collapsed ? "justify-center" : "gap-3"
                  }`}
                >
                  <MdHistory size={20} />
                  {!collapsed && <span>Loan History</span>}
                </div>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/admin/applications" className={navClass}>
                <div
                  className={`flex items-center w-full ${
                    collapsed ? "justify-center" : "gap-3"
                  }`}
                >
                  <CiViewList size={22} />
                  {!collapsed && <span>Applications</span>}
                </div>
              </NavLink>

              <NavLink to="/admin/metrics" className={navClass}>
                <div
                  className={`flex items-center w-full ${
                    collapsed ? "justify-center" : "gap-3"
                  }`}
                >
                  <SiVictoriametrics size={18} />
                  {!collapsed && <span>Metrics</span>}
                </div>
              </NavLink>
            </>
          )}
        </div>
      </div>

      {/* Bottom Profile Section */}
      <div className="relative p-4 border-t border-gray-100">
        <div
          className="flex items-center gap-3 p-2 rounded-xl cursor-pointer hover:bg-gray-100 transition"
          onClick={() => setShowLogout(!showLogout)}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-700 to-teal-900 flex items-center justify-center text-white font-bold shadow-md">
            {user?.email?.charAt(0).toUpperCase()}
          </div>

          {!collapsed && (
            <div>
              <p className="font-medium text-sm truncate">
                {user?.name || user?.email?.split("@")[0]}
              </p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
          )}
        </div>

        {showLogout && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowLogout(false)}
            />

            <div
              className={`absolute bottom-16 bg-white border rounded-xl shadow-xl p-3 z-50
    ${collapsed ? "left-20 w-52" : "left-4 right-4"}`}
            >
              <button
                className="w-full bg-teal-800 text-white rounded-lg py-2 mb-2 font-medium hover:bg-teal-900"
                onClick={() => navigate("/changepassword")}
              >
                Change Password
              </button>

              <button
                className="w-full bg-red-500 text-white rounded-lg py-2 font-medium hover:bg-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
