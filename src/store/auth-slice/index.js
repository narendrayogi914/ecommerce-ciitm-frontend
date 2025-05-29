import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticate: false,
  isLoading: true,
  user: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await axiosInstance.post("api/auth/register", formData);
    return response.data;
  }
);
export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("api/auth/login", formData);
      return response.data; // Return the successful response data
    } catch (error) {
      // Handle error response
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data); // Return the backend error
      }
      return rejectWithValue({ message: "Network error. Please try again." });
    }
  }
);

export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  const response = await axiosInstance.post("api/auth/logout", {});
  return response.data;
});

export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
  const response = await axiosInstance.get("api/auth/check-auth", {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Expires: "0",
    },
  });
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticate = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        (state.user = null), (state.isAuthenticate = false);
      })
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticate = action.payload.success ? true : false;
        state.error = null; // Clear any errors on success
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticate = false;
        state.error = action.payload?.message || "Something went wrong."; // Capture the error message
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticate = false;
      })
      .addCase(checkAuth.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null; // Update user details
        state.isAuthenticate = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        (state.user = null), (state.isAuthenticate = false);
      });
  },
});
export const { setUser } = authSlice.actions;
export default authSlice.reducer;
