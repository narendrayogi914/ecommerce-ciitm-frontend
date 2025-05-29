import React from "react";
import { Outlet } from "react-router-dom";
import ShoppingHeader from "./Header";
import ShoppingFooter from "./ShoppingFooter";

function ShoppingLayout() {
  return (
    <div className="flex flex-1 flex-col bg-white overflow-hidden ">
      {/* comman header component  */}
      <ShoppingHeader />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
      <ShoppingFooter />
    </div>
  );
}

export default ShoppingLayout;
