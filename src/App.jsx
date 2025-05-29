import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/auth/Layout";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminDashBoard from "./pages/adminView/DashBoards";
import AdminOrders from "./pages/adminView/Orders";
import AdminProducts from "./pages/adminView/Products";
import AdminLayout from "./components/admin-view/Layout";
import Features from "./pages/adminView/Features";
import ShoppingLayout from "./components/shppping-view/Layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import Listing from "./pages/shopping-view/Listing";

import Checkout from "./pages/shopping-view/checkout";
import Account from "./pages/shopping-view/account";
import CheckAuth from "./components/comman/CheckAuth";
import UnAuthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import CartListing from "./pages/shopping-view/CartListing";

function App() {
  const { isAuthenticate, isLoading, user } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return <Skeleton className=" h-[600px] bg-slate-200 w-full " />;
  }

  return (
    <div className="flex flex-col overflow-hidden bg-white w-full ">
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticate={isAuthenticate} user={user}>
              <Layout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticate={isAuthenticate} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashBoard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<Features />} />
        </Route>

        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticate={isAuthenticate} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<Listing />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="account" element={<Account />} />
          <Route path="cart" element={<CartListing />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="unauth-page" element={<UnAuthPage />} />
      </Routes>
    </div>
  );
}

export default App;
