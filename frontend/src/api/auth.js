import axiosInstance from "./api";

export const registerUser = async (name, email, password, role) => {
  const response = await axiosInstance.post(`/auth/register`, {
    name,
    email,
    password,
    role,
  });

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

export const verifyOtp=async(email)=>{
  const response=await axiosInstance.post(`/auth/verifyotp`,{email});
  return response.data
}
