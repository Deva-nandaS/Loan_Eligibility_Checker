import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PiSpinnerGap } from "react-icons/pi";

import { changePasswordThunk } from "../../redux/slices/authSlice";

export const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (message) {
      toast.success(message);
      navigate("/admin");
    }

    if (error) {
      toast.error(error);
    }
  }, [message, error, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password && !newPassword && !confirmPassword) {
      alert("Fill this field");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Password mismatch");
      return;
    }
    dispatch(changePasswordThunk({ password, newPassword }));
  };

  if (loading)
    return (
      <div className="flex gap-2 items-center h-screen justify-center">
        <PiSpinnerGap size={60} className="animate-spin text-teal-900" />
        <span className="text-teal-900 font-bold text-3xl">Updating....</span>
      </div>
    );

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="md:w-full max-w-4xl  sm:w-[500px] flex bg-white rounded-lg shadow-lg overflow-hidden min-h-[550px]">
        <div className="w-full md:w-1/2 flex justify-center border border-r-gray items-center p-6 ">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md flex flex-col"
          >
            <h4 className="text-2xl font-semibold text-center mb-4">
              Change Password
            </h4>

            <div className="border-b my-6"></div>

            <label className="font-bold">Current Password</label>
            <input
              type="password"
              value={password}
              placeholder="Current password"
              className="border p-2 rounded mb-3"
              onChange={(e) => setPassword(e.target.value)}
            />

            <label className="font-bold">New Password</label>
            <input
              type="password"
              value={newPassword}
              placeholder="New Password"
              className="border p-2 rounded mb-3"
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <label className="font-bold">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              className="border p-2 rounded mb-3"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="flex gap-3 items-center justify-center">
              <button
                className="bg-gray-200 font-bold text-black py-2 rounded mt-5 px-12"
                type="button"
                onClick={() => navigate("/admin/")}
              >
                BACK
              </button>
              <button
                className="bg-teal-800 font-bold text-white py-2 rounded mt-5 px-12"
                type="submit"
              >
                UPDATE
              </button>
            </div>
          </form>
        </div>

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
