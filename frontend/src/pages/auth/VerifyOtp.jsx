import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const VerifyOtp = () => {
    const location=useLocation();
    const navigate=useNavigate();

    const[loading,setLoading]=useState(false);
    const email=location.state?.email


    const handleVerify=async(e)=>{
        e.preventDefault();
        try{
             await VerifyOtp(email);
                  toast.success("Registered succesfully");
        }
        catch(err){
            toast.error("Error")
        }

    }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-4xl flex bg-white rounded-lg shadow-lg overflow-hidden min-h-[550px]">
        <div className="w-full md:w-1/2 flex  border border-r-gray items-start p-6 ">
          <form
            onSubmit={handleVerify}
            className="w-full max-w-md flex flex-col"
          >
            <h4 className="text-2xl font-semibold text-center mt-16 ">
              Verify OTP
            </h4>

            <div className="border-b my-6"></div>
            <p className="ml-6">Enter the 6-digit otp sent to your email address.</p>
            <div className="flex gap-3 ml-14 mt-3">
                <div >
                    <input type="text" className="border w-8 h-10 rounded-lg text-center"/>
                </div>
               <div >
                    <input type="text" className="border w-8 h-10 rounded-lg text-center"/>
                </div>
                <div >
                    <input type="text" className="border w-8 h-10 rounded-lg text-center "/>
                </div>
              <div >
                    <input type="text" className="border w-8 h-10 rounded-lg text-center"/>
                </div>
              <div >
                    <input type="text" className="border w-8 h-10 rounded-lg text-center "/>
                </div>
               <div >
                    <input type="text" className="border w-8 h-10 rounded-lg text-center"/>
                </div>

            </div>

            <div className="flex gap-3 items-center justify-center">
              <button
                className="bg-gray-200 font-bold text-black py-2 rounded mt-5 px-12"
                type="button"
                onClick={() => navigate("/register")}
              >
                BACK
              </button>
              <button
                className="bg-teal-800 font-bold text-white py-2 rounded mt-5 px-12"
                type="submit"
                disabled={loading}
              >
                CONFIRM
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
