import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../api/auth";

export const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast("Please enter your email");
      return;
    }
    try {
      setLoading(true);
      await forgotPassword(email);
      toast.success("Reset link sent to your email");
      setEmail("")
    } catch (err) {
      if (err.response?.status === 400) toast.error("Email not found");
      else toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="md:w-full max-w-4xl sm:w-[500px] flex bg-white rounded-lg shadow-lg overflow-hidden min-h-[550px]">
        <div className="w-full md:w-1/2 flex  border border-r-gray items-start p-6 ">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md flex flex-col"
          >
            <h4 className="text-2xl font-semibold text-center mt-16 ">
              Forgot Password
            </h4>

            <div className="border-b my-6"></div>
            <p>Enter your registered email address below.</p>

            <label className="font-bold mt-5">Email</label>
            <input
              type="email"
              value={email}
              placeholder="abc@gmail.com"
              className="border p-2 rounded mb-3 mt-3"
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="flex gap-3 items-center justify-center">
              <button
                className="bg-gray-200 font-bold text-black py-2 rounded mt-5 px-12"
                type="button"
                onClick={() => navigate("/")}
              >
                BACK
              </button>
              <button
                className="bg-teal-800 font-bold text-white py-2 rounded mt-5 px-12"
                type="submit"
             disabled={loading}
              >
                {loading?"Sending...":"Send Link"}
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
