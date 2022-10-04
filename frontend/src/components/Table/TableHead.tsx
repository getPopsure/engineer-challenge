import React from "react";

import styles from "./Table.module.scss";

const TableHead = () => (
  <thead className="border-b bg-gray-100">
    <tr className={styles.grid}>
      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left w-1/4">
        #
      </th>
      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left w-1/4">
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