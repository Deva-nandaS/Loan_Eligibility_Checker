import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getLoanHistory } from "../../api/apply";

export const fetchLoanHistory = createAsyncThunk("loan/history", async () => {
  const res = await getLoanHistory();
  return res;
});

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const loanSlice = createSlice({
  name: "loan",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoanHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoanHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchLoanHistory.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch";
      });
  },
});
export default loanSlice.reducer;
