import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth-slice/index";
import adminProductSlice from "./admin/product-slice/index";
import shoppingProductSlice from "./shop/productSlice/index";
import cartSlice from "./shop/cart/cartSlice";
import orderReducer from "./shop/order/orderSlice";

const store = configureStore({
  reducer: {
    // Add your reducers here
    auth: authReducer,
    AdminProduct: adminProductSlice,
    ShoppingProduct: shoppingProductSlice,
    cartSlice: cartSlice,
    orders: orderReducer,
  },
});

export default store;
