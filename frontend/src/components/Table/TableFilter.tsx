import React from "react";

import FilterDropdown from "../Filter/FilterDropdown/FilterDropdown";
import FilterByName from "../Filter/FilterByName";

type TTableFilter = React.HTMLAttributes<HTMLDivElement>;

const TableFilter: React.FC<TTableFilter> = () => (
  <>
    <FilterByName />
    <FilterDropdown filterKey="provider" label="provider" />
    <FilterDropdown filterKey="insuranceType" label="insurance type" />
    <FilterDropdown filterKey="status" label="status" />
  </>
);

export default React.memo(TableFilter);