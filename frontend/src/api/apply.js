import api from "./api";

export const createLoan = async (data) => {
  const res = await api.post("loan/apply", data);
  return res.data;
};

export const getLoanResult = async (id) => {
  const res = await api.get(`loan/result/${id}`);
  return res.data;
};

export const getLoanHistory = async () => {
  const res = await api.get("loan/history");
  return res.data;
};
