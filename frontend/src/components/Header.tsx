import React from "react";
import FilterButton from "./Filter/FilterButton";

const Header = () => (
  <div className="flex items-center justify-between">
    <h1 className="text-3xl font-bold text-gray-900 mb-2">Policies</h1>
    <FilterButton />
  </div>
);

export default React.memo(Header);