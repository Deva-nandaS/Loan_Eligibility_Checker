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
import { Result } from "./pages/applicant/Result";
import { History } from "./pages/applicant/History";
import { ViewApplication } from "./pages/admin/ViewApplication";
import { ApplicationDetail } from "./pages/admin/ApplicationDetail";
import { Metrics } from "./pages/admin/Metrics";

import { ChangePassword } from "./pages/ChangePassword";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
         <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/admin/admindashboard" element={<PrivateRoute  role="admin"><AdminDashboard /></PrivateRoute>} />
        <Route path="/applicant/applicantdashboard" element={<PrivateRoute role="applicant"><ApplicantDashboard   /></PrivateRoute>} />
        <Route path="/applicant/apply" element={<PrivateRoute role="applicant"><Apply /></PrivateRoute>} /> 
        <Route path="/applicant/result/:id" element={<PrivateRoute role="applicant"><Result /></PrivateRoute>} /> 
         <Route path="/applicant/history" element={<PrivateRoute role="applicant"><History /></PrivateRoute>} /> 
         <Route path="/admin/ViewApplication" element={<PrivateRoute  role="admin"><ViewApplication /></PrivateRoute>} />
          <Route path="/admin/applications/:id" element={<PrivateRoute  role="admin"><ApplicationDetail/></PrivateRoute>} />
          <Route path="/admin/metrics" element={<PrivateRoute  role="admin"><Metrics/></PrivateRoute>} />
         
         
         
      </Routes>
    </>
  );
}

export default App;