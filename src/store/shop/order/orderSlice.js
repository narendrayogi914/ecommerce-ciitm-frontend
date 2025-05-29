import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axiosInstance"; // ✅ import your instance

// Place order should post to /api/orders/place (not /api/orders)
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/api/orders/place", orderData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Fetch orders (unchanged, matches /api/orders/my-orders)
// ordersSlice.js or wherever your thunks are
export const fetchMyOrders = createAsyncThunk(
  "orders/fetchMyOrders",
  async (userId, { rejectWithValue }) => {
    try {
      // Send userId in body because no auth middleware
      const res = await axiosInstance.get("/api/orders/my-orders", {
        params: { userId }, // or in body if your backend requires POST
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Mark order as paid (unchanged)
export const markAsPaid = createAsyncThunk(
  "orders/markAsPaid",
  async (paymentData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        "/api/orders/mark-paid",
        paymentData
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    myOrders: [],
    placing: false,
    fetching: false,
    paid: false,
    error: null,
  },
  reducers: {
    resetOrderState: (state) => {
      state.placing = false;
      state.fetching = false;
      state.paid = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.placing = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.placing = false;
        state.myOrders.unshift(action.payload);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.placing = false;
        state.error = action.payload?.message || "Order failed";
      })

      .addCase(fetchMyOrders.pending, (state) => {
        state.fetching = true;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.fetching = false;
        state.myOrders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload?.message || "Failed to fetch orders";
      })

      .addCase(markAsPaid.fulfilled, (state) => {
        state.paid = true;
      })
      .addCase(markAsPaid.rejected, (state, action) => {
        state.paid = false;
        state.error = action.payload?.message || "Payment update failed";
      });
  },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
