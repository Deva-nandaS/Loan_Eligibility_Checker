import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PiSpinnerGap } from "react-icons/pi";

import { loginUserThunk } from "../../redux/slices/authSlice";

export const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isAuthenticated, user } = useSelector((state) => state.auth);
  if (isAuthenticated) {
    return (
      <Navigate
        to={user?.role === "admin" ? "/admin/" : "/applicant/"}
        replace
      />
    );
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return toast.error("Email is required");
    if (!password) return toast.error("Password is required");

    const result = await dispatch(loginUserThunk({ email, password }));

    if (!loginUserThunk.fulfilled.match(result)) {
      toast.error(result.payload);
    }
  };
  if (loading)
    return (
      <div className="flex gap-2 items-center h-screen justify-center">
        <PiSpinnerGap size={60} className="animate-spin text-teal-900" />
        <span className="text-teal-900 font-bold text-3xl">Logging in....</span>
      </div>
    );

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="md:w-full sm:w-[500px] max-w-4xl  flex bg-white rounded-lg shadow-lg overflow-hidden min-h-[550px]">
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
              type="email"
              value={email}
              placeholder="Email"
              className="border p-2 rounded mb-3"
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="flex items-center justify-between mt-4">
              <label className="font-bold">Password</label>
            </div>

            <input
              type="password"
              value={password}
              placeholder="Password"
              className="border p-2 rounded mb-2"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end ">
              {" "}
              <Link to="/forgot-password" className="text-blue-500">
                Forgot password?
              </Link>
            </div>

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
