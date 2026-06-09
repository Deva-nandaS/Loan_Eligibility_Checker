import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ children, role }) => {
  const {isAuthenticated,user}=useSelector((state)=>state.auth)

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (user?.role!== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};
