import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Sidebar } from "../../Components/Sidebar";
import { getLoanHistory } from "../../api/apply";

export const ApplicantDashboard = () => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getLoanHistory();
        setDetails({
          loanCount:data.length,
          approvedCount:data.filter(loan=>loan.eligible).length,
          rejectedCount:data.filter(loan=>!loan.eligible).length
        })
     
      } catch (err) {
        toast.error("Fetch error");
      }
    };
    fetch();
  }, []);

  if (!details) return <div>Loading...</div>;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex p-9 sm:flex sm:gap-2 gap-5 justify-start">
        <div className="grid grid-cols-3 gap-6">
        
          <div className="border rounded-lg w-80 h-40 border-t-blue-900 border-black border-t-8 p-9 text-xl">
            <p className="font-bold">TOTAL APPLICATIONS:{details.loanCount}</p>
          </div>

          <div className="border rounded-lg w-80 h-40 border-t-blue-900 border-black border-t-8 p-9 text-xl">
            <p className="font-bold">APPROVED:{details.approvedCount}</p>
          </div>

          <div className="border rounded-lg w-80 h-40 border-t-blue-900 border-black border-t-8 p-9 text-xl">
            <p className="font-bold">REJECTED:{details.rejectedCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
