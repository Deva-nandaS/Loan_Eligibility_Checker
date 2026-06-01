import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyOtp } from "../../api/auth";

export const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const email = location?.state?.email;
  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      await verifyOtp(email, otp.join(""));
      toast.success("Registered succesfully");
      navigate("/");
    } catch (err) {
     toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-4xl flex bg-white rounded-lg shadow-lg overflow-hidden min-h-[550px]">
        <div className="w-full md:w-1/2 flex  border border-r-gray items-start p-6 ">
          <form
            onSubmit={handleVerify}
           className="w-full max-w-md flex flex-col justify-start h-full"
          >
            <h4 className="text-2xl font-semibold text-center mt-16 ">
              Verify OTP
            </h4>

            <div className="border-b my-6"></div>
            <p className="ml-6">
              Enter the 6-digit otp sent to your email address.
            </p>
            <div className="flex gap-3 ml-14 mt-3">
              
                {otp.map((val, index) => (
                  <input
                  key={index}
                    type="text"
                    value={val}
                    className="border border-gray-500 w-8 h-10 rounded-lg text-center"
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[index] = e.target.value;
                      setOtp(newOtp);
                    }}
                    maxLength={1}
                  />
                ))}
            
        
            </div>

           <div className="flex gap-3 items-center justify-center mt-20 pb-6">
              <button
                className="bg-gray-200 font-bold text-black py-2 rounded px-12"
                type="button"
                onClick={() => navigate("/register")}
              >
                BACK
              </button>
              <button
                className="bg-teal-800 font-bold text-white py-2 rounded  px-12"
                type="submit"
              >
                CONFIRM
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
