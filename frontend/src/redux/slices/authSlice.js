import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  changePassword,
  loginUser,
  forgotPassword,
  resetPassword,
  sendOtp,
  verifyOtp,
} from "../../api/auth";

export const sendOtpThunk = createAsyncThunk(
  "auth/sendOtp",
  async ({ name, email, password, role }, { rejectWithValue }) => {
    try {
      const res = await sendOtp(name, email, password, role);
      return res;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Couldn't send OTP",
      );
    }
  },
);

export const verifyOtpThunk = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const res = await verifyOtp(email, otp);
      return res;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Couldn't verify OTP",
      );
    }
  },
);

export const loginUserThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await loginUser(email, password);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data.message || "Login failed");
    }
  },
);

export const changePasswordThunk = createAsyncThunk(
  "auth/changePassword",
  async ({ password, newPassword }, { rejectWithValue }) => {
    try {
      const res = await changePassword(password, newPassword);
      return res;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Password updation failed",
      );
    }
  },
);

export const forgotPasswordThunk = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const res = await forgotPassword(email);
      return res;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Password updation failed",
      );
    }
  },
);

export const resetPasswordThunk = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const res = await resetPassword(token, newPassword);
      return res;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Password updation failed",
      );
    }
  },
);
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
  message: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      .addCase(changePasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(changePasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(forgotPasswordThunk.pending, (state) => {
        console.log("pending");
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPasswordThunk.fulfilled, (state, action) => {
        console.log("fulfilled::::;", action.payload);
        state.loading = false;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        console.log("REJECTED:::", action.payload);
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPasswordThunk.pending, (state) => {
        console.log("pending");
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPasswordThunk.fulfilled, (state, action) => {
        console.log("fulfilled::::;", action.payload);
        state.loading = false;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        console.log("REJECTED:::", action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
