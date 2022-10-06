import React from "react";
import TableFilter from "./Table/TableFilter";

const Header = () => (
  <div className="grid">
    <h1 className="text-3xl font-bold text-gray-900 mb-2">Policies</h1>
    <TableFilter />
  </div>
);

export default React.memo(Header);