import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const fetchAllFilterProducts = createAsyncThunk(
  "/products/fetchProducts",
  async ({ filters, sort }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          // Convert Category → category, Brand → brand
          const apiKey = key.toLowerCase();
          params.append(apiKey, value.join(","));
        });
      }

      if (sort) {
        params.append("sort", sort);
      }

      const response = await axiosInstance.get(
        `api/shop/products/fetchProducts?${params.toString()}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || "Something went wrong");
    }
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilterProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilterProducts.fulfilled, (state, action) => {
        (state.isLoading = true), (state.productList = action.payload.data);
      })
      .addCase(fetchAllFilterProducts.rejected, (state, action) => {
        (state.isLoading = false), (state.productList = []);
      });
  },
});

export default shoppingProductSlice.reducer;
