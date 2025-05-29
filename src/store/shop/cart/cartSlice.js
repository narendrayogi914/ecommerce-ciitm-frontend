import axiosInstance from "@/utils/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 🔄 Async Thunks
export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
  const res = await axiosInstance.get(`api/cart/${userId}`);
  return res.data;
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    const res = await axiosInstance.post(`api/cart/add`, {
      userId,
      productId,
      quantity,
    });
    return res.data;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, productId }) => {
    await axiosInstance.post(`api/cart/remove`, { userId, productId });
    return { productId }; // ✅ Return only what's needed
  }
);

// 🧠 Initial State
const initialState = {
  items: [],
  userId: null,
  status: "idle",
  error: null,
  loading: false,
};

// 🧩 Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.items = action.payload.items;
        state.userId = action.payload.userId;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      })

      // ✅ Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ✅ Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        const removedId = action.payload.productId;
        state.items = state.items.filter(
          (item) => item.productId._id !== removedId
        );
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
