import axiosInstance from "./api";

export const getApplicantDashboard = async (id) => {
  const response = await axiosInstance.get("applicant/applicantdashboard");
  return response.data;
};
