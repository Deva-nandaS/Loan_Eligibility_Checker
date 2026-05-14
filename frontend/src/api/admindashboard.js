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
