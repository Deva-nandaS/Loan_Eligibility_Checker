import api from "./api";

export const registerUser = async (name, email, password, role) => {
  const response = await api.post(`/auth/register`, {
    name,
    email,
    password,
    role,
  });

  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await api.post(`/auth/login`, {
    email,
    password,
  });
  return response.data;
};

export const changePassword = async (password, newPassword) => {
  const response = await api.put(`/auth/changePassword`, {
    password,
    newPassword,
  });

  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await api.post(`/auth/forgotpassword`, {
    email,
  });

  return response.data;
};

export const resetPassword = async (token, newPassword) => {
  const response = await api.post(`/auth/resetpassword/${token}`, {
    newPassword,
  });
  return response.data;
};
