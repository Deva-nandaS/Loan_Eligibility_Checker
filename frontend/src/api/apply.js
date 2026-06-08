import axiosInstance from "./axiosInstance";

export const createLoan = async (data) => {
  const res = await axiosInstance.post("loan/apply", data);
  return res.data;
};

export const getLoanResult = async (id) => {
  const res = await axiosInstance.get(`loan/result/${id}`);
  return res.data;
};

export const getLoanHistory = async () => {
  const res = await axiosInstance.get("loan/history");
  return res.data;
};
