import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { ChangePassword } from "./pages/auth/ChangePassword";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { ResetPassword } from "./pages/auth/ResetPassword";
import { VerifyOtp } from "./pages/auth/VerifyOtp";

import { NotFound } from "./pages/auth/NotFound";
import { Apply } from "./pages/applicant/Apply"; 
import { ApplicantDashboard } from "./pages/applicant/ApplicantDashboard"; 
import { Result } from "./pages/applicant/Result";
import { History } from "./pages/applicant/History";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { ViewApplication } from "./pages/admin/ViewApplication";
import { ApplicationDetail } from "./pages/admin/ApplicationDetail";
import { Metrics } from "./pages/admin/Metrics";
import { PrivateRoute } from "./Components/PrivateRoute";



function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/register"                 element={<Register />} />
        <Route path="/"                         element={<Login />} />
         <Route path="/changepassword"          element={<ChangePassword />} />
         <Route path="/forgot-password"         element={<ForgotPassword/>}/>
         <Route path="/reset-password/:token"   element={<ResetPassword/>}/>
         <Route path="/verify-otp"              element={<VerifyOtp/>}/>

        <Route path="/admin/"                   element={<PrivateRoute  role="admin"><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/applications"       element={<PrivateRoute  role="admin"><ViewApplication /></PrivateRoute>} />
        <Route path="/admin/applications/:id"   element={<PrivateRoute  role="admin"><ApplicationDetail/></PrivateRoute>} />   
        <Route path="/admin/metrics"            element={<PrivateRoute  role="admin"><Metrics/></PrivateRoute>} />

        <Route path="/applicant/"               element={<PrivateRoute role="applicant"><ApplicantDashboard   /></PrivateRoute>} />
        <Route path="/applicant/apply"          element={<PrivateRoute role="applicant"><Apply /></PrivateRoute>} /> 
        <Route path="/applicant/result/:id"     element={<PrivateRoute role="applicant"><Result /></PrivateRoute>} /> 
        <Route path="/applicant/history"        element={<PrivateRoute role="applicant"><History /></PrivateRoute>} /> 

        <Route path="*" element={<NotFound/>}/>     
      </Routes>
    </>
  );
}

export default App;