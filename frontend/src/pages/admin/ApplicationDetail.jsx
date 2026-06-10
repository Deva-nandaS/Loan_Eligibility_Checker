import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PiSpinnerGap } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";

import { Sidebar } from "../../Components/Sidebar";

import { Button } from "../../Components/ui/Button";
import { getApprovedFields, getRejectedFields } from "../../constants";
import { getApplicationByIdThunk,updateOverrideThunk } from "../../redux/slices/adminSlice";



const Card = ({ label, value }) => {
  const isTwo = label === "Reasons" || label === "Suggestions";
  return isTwo ? (
    <div className="flex flex-col gap-1 ">
      <span className="font-semibold text-gray-600">{label}</span>
      <span className="text-black">{value}</span>
    </div>
  ) : (
    <div className="flex justify-between ">
      <span className="font-semibold text-gray-600">{label}</span>
      <span className="font-medium mr-5">{value}</span>
    </div>
  );
};

export const ApplicationDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch=useDispatch();
  const {loading,error,message,applicationDetails}=useSelector((state)=>state.admin)
  // const showDetails=applicationDetails||[]
  const [showDetails,setShowDetails]=useState(false)

  const [showOverride, setShowOverride] = useState(false);
  const [reason, setReason] = useState("");
  const [suggestions, setSuggestion] = useState("");

  useEffect(() => {
      dispatch( getApplicationByIdThunk(id));
  }, [dispatch,id]);

    useEffect(() => {
     if(message){
      toast.success(message)
     }
  }, [message]);

  useEffect(() => {
     if(error){
      toast.error(error)
     }
  }, [error]);


  const handleOverride = () => {
    if (showDetails.emptype === "Unemployed") return;
    setShowOverride(true);
  };
  const handleConfirm = async () => {
  
      const response=dispatch(updateOverrideThunk(
        id,
        !showDetails.eligible,
        reason,
        suggestions,
      ))

      if (response.eligible === true) {
        setShowDetails({
          ...showDetails,
          eligible: !showDetails.eligible,
          interestRate: response.interestRate,
          emi: response.emi,
          totalPayable: response.totalPayable,
          totalInterestPayable: response.totalInterestPayable,
          debtRatio: response.debtRatio,
          riskCategory: response.riskCategory,
          requestedAmount: response.amount,
          approvedAmount: response.amount,
          reasons: [reason],
          suggestions: [suggestions],
        });
      } else {
        setShowDetails({
          ...showDetails,
          eligible: !showDetails.eligible,
          reasons: [reason],
          suggestions: [suggestions],
        });

        setShowOverride(false);
      }
      setReason(" ");
      setSuggestion(" ");
  

    setShowOverride(false);
  };

    if (loading)
      return (
        <div className="flex gap-2 h-screen items-center justify-center">
          <PiSpinnerGap size={60} className="animate-spin text-teal-900" />
          <span className="font-bold text-3xl text-teal-900">Loading....</span>
        </div>
      );

  const fields = showDetails.eligible
    ? getApprovedFields(showDetails)
    : getRejectedFields(showDetails);

    
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 ml-16 md:ml-48 flex items-center justify-center p-4 md:p-6">
        <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-lg border border-teal-800 ">
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {fields.map(({ label, value }) => (
              <Card key={label} label={label} value={value} />
            ))}
          </div>
          <div className="flex gap-4 mt-8">
            <Button
              className="flex-1 bg-gray-400 border text-black rounded-lg font-bold py-2 hover:bg-gray-200"
              onClick={() => navigate("/admin/", { replace: true })}
            >
              Back
            </Button>
            <div className="relative group flex-1">
              <Button
                className={`w-full text-white rounded-lg font-bold py-2 
                  ${
                    showDetails.emptype === "Unemployed"
                      ? "bg-gray-400 cursor-not-allowed opacity-50"
                      : "bg-teal-800 hover:bg-gray-800"
                  }`}
                onClick={handleOverride}
                disabled={showDetails.emptype === "Unemployed"}
              >
                Override
              </Button>
              {showDetails.emptype === "Unemployed" && (
                <div className="absolute bottom-10 left-0 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-48 z-10">
                  Cannot override — applicant is Unemployed
                </div>
              )}
            </div>
            <Button
              className="flex-1 bg-teal-800 text-white rounded-lg font-bold py-2 hover:bg-gray-800"
              onClick={() => navigate("/admin/", { replace: true })}
            >
              Done
            </Button>
          </div>

          {showOverride && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="border-2 border-teal-700 bg-white shadow-2xl w-full max-w-md rounded-xl">
                <div className="flex flex-col p-6 gap-5">
                  <h2 className="font-bold text-lg border-b pb-2">
                    Status Updation
                  </h2>
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold">Reason:</label>
                    <input
                      type="text"
                      value={reason}
                      placeholder="Enter reason"
                      className="border p-2 rounded"
                      onChange={(e) => setReason(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold">Suggestions:</label>
                    <input
                      type="text"
                      value={suggestions}
                      placeholder="Enter suggestions"
                      className="border p-2 rounded"
                      onChange={(e) => setSuggestion(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <div className="border px-5 bg-gray-300 text-black rounded-md p-2">
                      <Button
                        className="font-bold"
                        onClick={() => setShowOverride(false)}
                      >
                        Back
                      </Button>
                    </div>
                    <div className="border px-5 bg-teal-800 text-white rounded-md p-2">
                      <Button className="font-bold" onClick={handleConfirm}>
                        Confirm
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
