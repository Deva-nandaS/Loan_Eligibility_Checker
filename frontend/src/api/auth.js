import api from "./api";

export const registerUser = async (name, email, password, role) => {
  const response = await api.post(`auth/register`, {
    name,
    email,
    password,
    role,
  });

  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await api.post(`auth/login`, {
    email,
    password,
  });
  return response.data;
};

export const changePassword = async (password, newPassword) => {
  const response = await api.put(`auth/changePassword`, {
    password,
    newPassword,
  });

  return response.data;
};

export const ForgotPassword = async (email) => {
  const response = await api.post(`auth/ForgotPassword`, {
    email,
  });

  return response.data;
};

export const ResetPassword = async (email, newPassword) => {
  const response = await api.put(`auth/resetPassword`, {
    email,
    newPassword,
  });
  return response.data;
};
