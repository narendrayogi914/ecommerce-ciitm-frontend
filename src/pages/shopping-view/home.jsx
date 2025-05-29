import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MyCarousel from "@/components/shppping-view/carousel";
import { fetchAllFilterProducts } from "@/store/shop/productSlice";
import ShoppingProductTile from "./producttile";
import { Link } from "react-router-dom";

function ShoppingHome() {
  const [mensCategoryData, setMensCategoryData] = useState([]);
  const [womenCategoryData, setWomenCategoryData] = useState([]);
  const [accessoriesCategoryData, setAccessoriesCategoryData] = useState([]);

  const dispatch = useDispatch();

  // Fetch for Men category
  useEffect(() => {
    dispatch(
      fetchAllFilterProducts({ filters: { Category: ["men"] }, sort: "" })
    ).then((res) => {
      if (res?.payload?.status === "success") {
        setMensCategoryData(res.payload.data || []);
      }
    });
  }, [dispatch]);

  // Fetch for Women category
  useEffect(() => {
    dispatch(
      fetchAllFilterProducts({ filters: { Category: ["women"] }, sort: "" })
    ).then((res) => {
      if (res?.payload?.status === "success") {
        setWomenCategoryData(res.payload.data || []);
      }
    });
  }, [dispatch]);

  // Fetch for Accessories category
  useEffect(() => {
    dispatch(
      fetchAllFilterProducts({
        filters: { Category: ["accessories"] },
        sort: "",
      })
    ).then((res) => {
      if (res?.payload?.status === "success") {
        setAccessoriesCategoryData(res.payload.data || []);
      }
    });
  }, [dispatch]);

  const renderProductSection = (title, data) => (
    <section className="py-8 px-4 md:px-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link
          to="/shop/listing"
          className="text-blue-500 hover:underline text-sm"
        >
          See All
        </Link>
      </div>

      {data.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {data.slice(0, 4).map((item, index) => (
            <ShoppingProductTile key={index} product={item} />
          ))}
        </div>
      )}
    </section>
  );

  return (
    <>
      <MyCarousel />
      {renderProductSection("Men's Clothes", mensCategoryData)}
      {renderProductSection("Women's Clothes", womenCategoryData)}
      {renderProductSection("Accessories", accessoriesCategoryData)}
    </>
  );
}

export default ShoppingHome;
