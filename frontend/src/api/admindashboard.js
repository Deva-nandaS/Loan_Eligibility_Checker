import axios from "axios";

export const getAdminDashboard = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    "http://localhost:5000/api/admin/admindashboard",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

export const getApplication = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    "http://localhost:5000/api/loan/viewapplications",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

export const getApplicationById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `http://localhost:5000/api/loan/applicationdetails/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

export const updateOverride = async (id,eligible,reason,suggestion) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(
    `http://localhost:5000/api/loan/override/${id}`,
    {eligible,reason,suggestion},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
