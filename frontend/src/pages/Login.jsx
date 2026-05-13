import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Fill name field");
      return;
    }
    if (!password) {
      alert("Password mismatch");

      return;
    }   
    toast.success("Login successful");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-4xl flex bg-white rounded-lg shadow-lg overflow-hidden">
        {/* LEFT FORM */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-6">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md flex flex-col"
          >
            <h4 className="text-2xl font-semibold text-center mb-4">Login</h4>

            <p className="text-center mb-4">
              Not registered yet?{" "}
              <Link to="/" className="text-blue-500">
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

            <label className="font-bold">Password</label>
            <input
              value={password}
              placeholder="Password"
              className="border p-2 rounded mb-3"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="bg-black text-white py-2 rounded" type="submit">
              Login
            </button>
          </form>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-50">
          <img className="w-40" src="/.png" alt="Loan_Eligibility_Checker" />
        </div>
      </div>
    </div>
  );
};
