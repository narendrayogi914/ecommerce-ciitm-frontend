import ProductFilter from "@/components/shppping-view/filter";
import { Button } from "@/components/ui/button";
import { sortOptions } from "@/config";
import { fetchAllFilterProducts } from "@/store/shop/productSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoppingProductTile from "./producttile";
import { useSearchParams } from "react-router-dom";

function Listing() {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.ShoppingProduct);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("price-lowtohigh");

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSort = (value) => {
    setSort(value);
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set("sort", value);
    setSearchParams(updatedParams);
  };

  const handleFilter = (sectionId, optionId) => {
    const currentOptions = filters[sectionId] || [];

    let newOptions;
    if (currentOptions.includes(optionId)) {
      // Remove the option
      newOptions = currentOptions.filter((id) => id !== optionId);
    } else {
      // Add the option
      newOptions = [...currentOptions, optionId];
    }

    // Build new filter object
    const newFilters = {
      ...filters,
      [sectionId]: newOptions,
    };

    // Clean up empty filter sections
    if (newOptions.length === 0) {
      delete newFilters[sectionId];
    }

    // Update state (force new reference)
    setFilters({ ...newFilters });

    // Update URL search params
    const updatedParams = new URLSearchParams();

    Object.keys(newFilters).forEach((key) => {
      if (newFilters[key]?.length > 0) {
        updatedParams.set(key, newFilters[key].join(","));
      }
    });

    setSearchParams(updatedParams);
  };

  useEffect(() => {
    const savedFilters = {};
    for (const [key, value] of searchParams.entries()) {
      if (key !== "sort") {
        savedFilters[key] = value.split(",");
      }
    }
    setFilters(savedFilters);

    const sortParam = searchParams.get("sort");
    if (sortParam) {
      setSort(sortParam);
    }
  }, [searchParams]);

  // Fetch list of products
  useEffect(() => {
    dispatch(fetchAllFilterProducts({ filters, sort }));
  }, [dispatch, filters, sort]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm ">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">10 Products</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" className="flex items-center">
                  <ArrowUpDown className="h-4 w-4" />
                  <span>Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="  w-[200px] bg-white">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((item) => (
                    <DropdownMenuRadioItem
                      key={item.id}
                      value={item.id}
                      className={`p-2 cursor-pointer outline-none ${
                        sort === item.id
                          ? "bg-sky-100 text-primary font-bold"
                          : "hover:bg-sky-100"
                      }`}
                    >
                      <span>{item.label}</span>
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
          {productList && productList.length > 0 ? (
            productList.map((productItem, index) => (
              <ShoppingProductTile key={index} product={productItem} />
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Listing;
