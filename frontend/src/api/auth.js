import axiosInstance from "./axiosInstance";

export const sendOtp = async (name,email,password,role) => {
  const response = await axiosInstance.post(`/auth/sendotp`, { name,email,password,role });
  return response.data;
};
export const verifyOtp = async (email, otp) => {
  const response = await axiosInstance.post(`/auth/verifyotp`, { email, otp });
  return response.data;
};


export const loginUser = async (email, password) => {
  const response = await axiosInstance.post(`/auth/login`, {
    email,
    password,
  });
  return response.data;
};

export const changePassword = async (password, newPassword) => {
  const response = await axiosInstance.put(`/auth/changePassword`, {
    password,
    newPassword,
  });

  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await axiosInstance.post(`/auth/forgotpassword`, {
    email,
  });

  return response.data;
};

export const resetPassword = async (token, newPassword) => {
  const response = await axiosInstance.post(`/auth/resetpassword/${token}`, {
    newPassword,
  });
  return response.data;
};

