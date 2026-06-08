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
  const { user, role } = useSelector((state) => state.auth);
  const { collapsed } = useSelector((state) => state.sidebar);


  const [showLogout, setShowLogout] = useState(false);

  const handleToggleSidebar = () => dispatch(toggleSidebar());
  const wrapperClass = "flex items-center gap-2";
  const IconClass = "text-gray-400 ml-3";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/", { replace: true });
  };

  const navClass = ({ isActive }) =>
    `flex p-3 font-medium cursor-pointer
    ${isActive ? "bg-teal-800 text-white" : "hover:bg-gray-100 hover:text-white"}`;

  return (
    <div
      className={`${collapsed ? "w-20" : "w-32"} fixed left-0 top-0 border-r h-screen shadow-2xl flex flex-col justify-between bg-white transition-all duration-300`}
    >
      {/* Top section */}
      <div>
        <div
          className="flex p-4 justify-center items-center"
          onClick={() => navigate("/admin")}
        >
          {!collapsed && (
            <img
              src="/Loan_lens_logo.png"
              alt="logo"
              className="w-56 cursor-pointer"
            />
          )}
        </div>

        {/* Toggle button */}
        <div
          className={`p-3 flex ${collapsed ? "justify-center" : "justify-end"}`}
        >
          {collapsed ? (
            <AiOutlineMenu
              size={20}
              className="cursor-pointer text-gray-400 mt-3"
              onClick={handleToggleSidebar}
            />
          ) : (
            <AiOutlineClose
              size={20}
              className="cursor-pointer text-gray-400"
              onClick={handleToggleSidebar}
            />
          )}
        </div>

        {role === "applicant" ? (
          <div className="flex gap-5 flex-col">
            <NavLink to="/applicant/apply" className={navClass}>
              <div className={wrapperClass}>
                <GrFormAdd size={20} className={IconClass} />
                {!collapsed && <p>New</p>}
              </div>
            </NavLink>

            <NavLink to="/applicant/history" className={navClass}>
              <div className={wrapperClass}>
                <MdHistory size={18} className={IconClass} />
                {!collapsed && <p>History</p>}
              </div>
            </NavLink>
          </div>
        ) : (
          <div className="flex gap-5 flex-col">
            <NavLink to="/admin/applications" className={navClass}>
              <div className={wrapperClass}>
                <CiViewList size={20} className={IconClass} />
                {!collapsed && <p>View</p>}
              </div>
            </NavLink>

            <NavLink to="/admin/metrics" className={navClass}>
              <div className={wrapperClass}>
                <SiVictoriametrics size={18} className={IconClass} />
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
