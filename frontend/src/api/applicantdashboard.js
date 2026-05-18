import axios from "axios";

export const getApplicantDashboard = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    "http://localhost:5000/api/applicant/applicantdashboard",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
