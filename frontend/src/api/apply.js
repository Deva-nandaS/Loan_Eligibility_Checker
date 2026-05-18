import axios from "axios";

const API_URL = "http://localhost:5000/api/loan";

export const createLoan = async (data) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(`${API_URL}/apply`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getLoanResult = async (id) => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_URL}/result/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getLoanHistory = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_URL}/history`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
