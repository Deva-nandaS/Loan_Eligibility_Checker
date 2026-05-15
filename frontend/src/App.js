import "./App.css";
import { Login } from "./pages/Login";
import { Register } from "./pages/applicant/Register";
import { Apply } from "./pages/applicant/Apply";  
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { ApplicantDashboard } from "./pages/applicant/ApplicantDashboard";
import { PrivateRoute } from "./Components/PrivateRoute";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/admin/admindashboard" element={<PrivateRoute  role="admin"><AdminDashboard /></PrivateRoute>} />
        <Route path="/applicant/applicantdashboard" element={<PrivateRoute role="applicant"><ApplicantDashboard   /></PrivateRoute>} />
        <Route path="/applicant/apply" element={<PrivateRoute role="applicant"><Apply /></PrivateRoute>} /> 
         
      </Routes>
    </>
  );
}

export default App;