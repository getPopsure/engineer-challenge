import React from "react";

const Header = () => (
  <div className="flex items-center justify-between">
    <h1 className="text-3xl font-bold text-gray-900 mb-2">Policies</h1>
  </div>
);

export default React.memo(Header);