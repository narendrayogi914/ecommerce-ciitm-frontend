import { filterOptions } from "@/config";
import React, { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      {/* Filters Header */}
      <div className="p-4 border-b bg-gray-50">
        <h2 className="text-lg font-extrabold text-gray-800">Filters</h2>
      </div>

      {/* Filter Options */}
      <div className="p-4 space-y-6">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            {/* Filter Section */}
            <div>
              <h3 className="text-base font-semibold text-gray-700">
                {keyItem}
              </h3>
              <div className="grid gap-3 mt-3">
                {filterOptions[keyItem].map((option) => (
                  <Label
                    key={option.id}
                    className="flex items-center gap-3 font-medium text-sm text-gray-600 hover:text-gray-800"
                  >
                    <Checkbox
                      checked={
                        filters[keyItem] && filters[keyItem].includes(option.id)
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />

                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
