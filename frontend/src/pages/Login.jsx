import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../api/auth";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email is required");
      return;
    }

    if (!password) {
      toast.error("Password is required");
      return;
    }
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      const user = data.data.user;

      if (user.role === "admin") {
        navigate("/admin/admindashboard");
      } else {
        navigate("/applicant/");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-4xl flex bg-white rounded-lg shadow-lg overflow-hidden min-h-[550px]">
        {/* LEFT FORM */}

        <div className="w-full md:w-1/2 flex justify-center border-r-gray border items-center p-10 min-h-[500px]">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md flex flex-col gap-2"
          >
            <h4 className="text-2xl font-semibold text-center mb-4">Login</h4>

            <p className="text-center mb-4">
              Not registered yet?{" "}
              <Link to="/register" className="text-blue-500">
                Sign up
              </Link>
            </p>

            <div className="border-b my-6"></div>

            <label className="font-bold">Email</label>
            <input
              value={email}
              placeholder="Email"
              className="border p-2 rounded mb-3"
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="flex items-center justify-between mt-4">
              <label className="font-bold">Password</label>
              <Link to="/forgotpassword" className="text-blue-500">
                Forgot password?
              </Link>
            </div>
            <input
              value={password}
              placeholder="Password"
              className="border p-2 rounded mb-6"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="bg-teal-800 text-white py-2 rounded mt-4"
              type="submit"
            >
              {" "}
              Login
            </button>
          </form>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden md:flex w-1/2  items-center justify-center mr-6">
          <img
            className="w-[600px] h-[600px]"
            src="/Loan_lens_logo.svg"
            alt="Loan_Eligibility_Checker"
          />
        </div>
      </div>
    </div>
  );
};
