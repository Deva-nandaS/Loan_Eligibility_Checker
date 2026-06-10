import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAdminDashboard, getApplication ,getApplicationById, updateOverride} from "../../api/admindashboard";

export const adminDashboardThunk = createAsyncThunk(
  "admin/getAdminDashboard",
  async (_, { rejectWithValue }) => {
    try {
      return await getAdminDashboard();
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message);
    }
  },
);

export const getApplicationThunk = createAsyncThunk(
  "admin/getApplication",
  async (_, { rejectWithValue }) => {
    try {
      return await getApplication();
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message);
    }
  },
);


export const getApplicationByIdThunk = createAsyncThunk(
  "admin/getApplicationByIdThunk",
  async (_, { rejectWithValue }) => {
    try {
      return await getApplicationById();
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message);
    }
  },
);

export const updateOverrideThunk = createAsyncThunk(
  "admin/updateOverrideThunk",
  async (id, eligible, reason, suggestions, { rejectWithValue }) => {
    try {
      return await updateOverride(id, eligible, reason, suggestions);
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message);
    }
  },
);


const initialState = {
  loading: false,
  data: {},
  error: "",
  message: null,
  application: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(adminDashboardThunk.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(adminDashboardThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.data = action.payload.data;
        state.error = "";
      })
      .addCase(adminDashboardThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getApplicationThunk.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getApplicationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.application = action.payload.data
        state.error = "";
      })
      .addCase(getApplicationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

       .addCase(getApplicationByIdThunk.pending, (state) => {
        console.log("pending");
        state.loading = true;
        state.error = "";
      })
      .addCase(getApplicationByIdThunk.fulfilled, (state, action) => {
        console.log("fulfilled");
        state.loading = false;
        state.message = action.payload.message;
        console.log("message:",state.message)
        state.applicationDetails = action.payload.data
         console.log("application:",state.applicationDetails)
        state.error = "";
      })
      .addCase(getApplicationByIdThunk.rejected, (state, action) => {
        console.log("rejected");
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
