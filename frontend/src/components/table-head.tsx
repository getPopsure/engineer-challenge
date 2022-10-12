import { FunctionComponent } from "react";

import { TableHeadProps } from "../models/Table";
import { TableHeadFilter } from "./table-head-filter";

const TableHead: FunctionComponent<TableHeadProps> = ({
  columns,
  onFilterChange,
  filterState,
}) => {
  return (
    <thead className="border-b bg-gray-100">
      <tr>
        {columns.map(
          ({ name, type, selectOptions = [], selected = [] }, index) => (
            <th
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              scope="col"
              key={index}
            >
              <div>
                <span>{name}</span>
                <TableHeadFilter
                  name={name}
                  type={type}
                  options={selectOptions}
                  onFilterChange={onFilterChange}
                  selected={selected}
                  filterState={filterState}
                />
              </div>
            </th>
          )
        )}
      </tr>
    </thead>
  );
};

export { TableHead };
