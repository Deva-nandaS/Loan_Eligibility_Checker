import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getLoanHistory, getLoanResult } from "../../api/apply";
import { createLoan } from "../../api/apply";

export const fetchLoanHistory = createAsyncThunk(
  "loan/history",
  async (_, { rejectWithValue }) => {
    try {
      return await getLoanHistory();
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

export const applyLoanthunk = createAsyncThunk(
  "loan/apply",
  async (loanData, { rejectWithValue }) => {
    try {
      const res = await createLoan(loanData);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message||"something went wrong");
    }
  },
);


export const getResultThunk = createAsyncThunk(
  "loan/result",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getLoanResult(id);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message||"something went wrong");
    }
  },
);

const initialState = {
  loading: false,
  data: [],
  application: null,
  result:null,
  error: "",
};

const loanSlice = createSlice({
  name: "loan",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoanHistory.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchLoanHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchLoanHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(applyLoanthunk.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(applyLoanthunk.fulfilled, (state, action) => {
        state.loading = false;
        state.application = action.payload;
      })
      .addCase(applyLoanthunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

       .addCase(getResultThunk.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getResultThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.result= action.payload;
      })
      .addCase(getResultThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default loanSlice.reducer;
