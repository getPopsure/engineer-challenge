import React from "react";

import FilterDropdown from "../Filter/FilterDropdown/FilterDropdown";
import FilterName from "../Filter/FilterName";

type TTableFilter = React.HTMLAttributes<HTMLDivElement>;

const TableFilter: React.FC<TTableFilter> = () => (
  <>
    <FilterName />
    <FilterDropdown filterKey="provider" label="provider" />
    <FilterDropdown filterKey="insuranceType" label="insurance type" />
    <FilterDropdown filterKey="status" label="status" />
  </>
);

export default React.memo(TableFilter);