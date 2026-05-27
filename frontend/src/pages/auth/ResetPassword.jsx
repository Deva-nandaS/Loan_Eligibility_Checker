import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword && !confirmPassword) {
      toast.error("Fill this field");
    }

    if (newPassword !== confirmPassword) {
      toast.error("Password mismatch");

      return;
    }
    try {
      const response = await ResetPassword(newPassword);
      setNewPassword(response);

      toast.success("Password Updated successfully");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-4xl flex bg-white rounded-lg shadow-lg overflow-hidden min-h-[550px]">
        <div className="w-full md:w-1/2 flex justify-center border border-r-gray items-center p-6 ">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md flex flex-col"
          >
            <h4 className="text-2xl font-semibold text-center mb-4">
              Reset Password
            </h4>

            <div className="border-b my-6"></div>

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
                SUBMIT
              </button>
            </div>
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
