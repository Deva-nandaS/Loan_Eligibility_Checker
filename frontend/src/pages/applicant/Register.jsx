import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../api/auth";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      alert("Fill name field");
      return;
    }
    if (password !== confirmPassword) {
      alert("Password mismatch");

      return;
    }
     try {

    const response = await registerUser(
      name,
      email,
      password,
      "applicant"
    );

  

    toast.success("Registered successfully");

  } catch (err) {

    toast.error("Registration failed");
  }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
  
<div className="w-full max-w-4xl flex bg-white rounded-lg shadow-2xl overflow-hidden min-h-[550px] ">
        <div className="w-full md:w-1/2 flex justify-center items-center border-r-gray border p-6">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md flex flex-col"
          >
            <h4 className="text-2xl font-semibold text-center mb-4">
              Register
            </h4>

            <p className="text-center mb-4">
              Already have an account?{" "}
              <Link to="/" className="text-blue-500">
                Login here
              </Link>
            </p>

            <div className="border-b my-6"></div>

            <label className="font-bold">Name</label>
            <input
              type="text"
              value={name}
              placeholder="Name"
              className="border p-2 rounded mb-3"
              onChange={(e) => setName(e.target.value)}
            />

            <label className="font-bold">Email</label>
            <input
              type="email"
              value={email}
              placeholder="Email"
              className="border p-2 rounded mb-3"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="font-bold">Password</label>
            <input
              type="password"
              value={password}
              placeholder="Password"
              className="border p-2 rounded mb-3"
              onChange={(e) => setPassword(e.target.value)}
            />

            <label className="font-bold">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              className="border p-2 rounded mb-3"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <label className="font-bold">Role</label>
            <select className="border p-2 rounded mb-4">
              <option>Applicant</option>
            </select>

            <button className="bg-teal-800 text-white py-2 rounded" type="submit">
              Register
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
