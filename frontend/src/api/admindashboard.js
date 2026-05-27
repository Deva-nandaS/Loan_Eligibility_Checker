import api from "./api";

export const getAdminDashboard = async () => {
  const response = await api.get("admin/admindashboard");
  return response.data;
};

export const getApplication = async () => {
  const response = await api.get("loan/viewapplications");
  return response.data;
};

export const getApplicationById = async (id) => {
  const response = await api.get(`loan/applicationdetails/${id}`);
  return response.data;
};

export const updateOverride = async (id, eligible, reason, suggestions) => {
  const response = await api.put(`loan/override/${id}`, {
    eligible,
    reason,
    suggestions,
  });
  return response.data;
};
