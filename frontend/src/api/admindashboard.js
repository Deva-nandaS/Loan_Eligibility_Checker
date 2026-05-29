import axiosInstance from "./api";

export const getAdminDashboard = async () => {
  const response = await axiosInstance.get("admin/admindashboard");
  return response.data;
};

export const getApplication = async () => {
  const response = await axiosInstance.get("loan/viewapplications");
  return response.data;
};

export const getApplicationById = async (id) => {
  const response = await axiosInstance.get(`loan/applicationdetails/${id}`);
  return response.data;
};

export const updateOverride = async (id, eligible, reason, suggestions) => {
  const response = await axiosInstance.put(`loan/override/${id}`, {
    eligible,
    reason,
    suggestions,
  });
  return response.data;
};
