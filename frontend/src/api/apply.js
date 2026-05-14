import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const createLoan = async (data) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(`${API_URL}/apply`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

