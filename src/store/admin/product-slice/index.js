import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addNewProduct",
  async (FormData) => {
    const result = await axios.post(
      "api/admin/products/add-product",
      FormData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }) => {
    try {
      const result = await axiosInstance.put(
        `api/admin/products/update-product/${id}`,
        formData
      );
      return result.data;
    } catch (error) {
      // Handle error appropriately
      throw new Error(
        error.response?.data?.message || "Failed to update product"
      );
    }
  }
);
export const fetchProducts = createAsyncThunk(
  "/products/fetchProducts",
  async (FormData) => {
    const result = await axiosInstance.get("api/admin/products/fetch-product");

    return result?.data;
  }
);
export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async ({ id }, { rejectWithValue }) => {
    console.log("Deleting product with ID:", id); // Check the ID
    if (!id) {
      return rejectWithValue("Product ID is undefined");
    }
    try {
      const result = await axiosInstance.delete(
        `api/admin/products/delete-product/${id}`
      );
      return result.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchProducts.rejected, (state) => {
        (state.isLoading = false), (state.productList = []);
      });
  },
});

export default adminProductSlice.reducer;
