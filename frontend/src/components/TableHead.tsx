import React from "react";

const TableHead = () => (
  <thead className="border-b bg-gray-100">
    <tr>
      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
        #
      </th>
      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
        Name
      </th>
      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
        Provider
      </th>
      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
        Type
      </th>
      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
        Status
      </th>
    </tr>
  </thead>
)


export default React.memo(TableHead);