import "./App.css";
import { Login } from "./pages/Login";
import { Register } from "./pages/applicant/Register";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { ApplicantDashboard } from "./pages/applicant/ApplicantDashboard";

function App() {
  return (
    <>
      {" "}
      <ToastContainer />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/applicantdashboard" element={<ApplicantDashboard />} />
      </Routes>
    </>
  );
}

export default App;
