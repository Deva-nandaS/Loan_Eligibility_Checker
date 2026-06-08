import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ children, role }) => {
  const {isAuthenticated,role:userRole}=useSelector((state)=>state.auth)

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};
