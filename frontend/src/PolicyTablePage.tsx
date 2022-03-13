import React from "react";
import PolicyTable from "./PolicyTable";
import PolicyTableInsuranceTypeFilter from "./PolicyTableInsuranceTypeFilter";
import PolicyTableTextFilter from "./PolicyTableTextFilter";

export default React.memo(function PolicyTablePage() {
  const [textFilter, setTextFilter] = React.useState("");
  const [insuranceTypeFilter, setInsuranceFilter] = React.useState([
    "LIABILITY",
    "HOUSEHOLD",
    "HEALTH",
  ]);

  return (
    <div className="overflow-x-auto min-w-full">
      <div className="block px-6 py-2">
        <div className="py-4 flex gap-4">
          <PolicyTableTextFilter onFilterChange={setTextFilter} />

          <PolicyTableInsuranceTypeFilter
            value={insuranceTypeFilter}
            onFilterChange={setInsuranceFilter}
          />
        </div>

        <PolicyTable
          paginationLimit={33}
          textFilter={textFilter}
          insuranceTypeFilter={insuranceTypeFilter}
        />
      </div>
    </div>
  );
});
