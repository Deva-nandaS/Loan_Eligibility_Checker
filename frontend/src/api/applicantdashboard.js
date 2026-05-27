import api from "./api";

export const getApplicantDashboard = async (id) => {
  const response = await api.get("applicant/applicantdashboard");
  return response.data;
};
