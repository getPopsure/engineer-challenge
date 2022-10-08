import React, { useContext } from "react";

import FilterDropdown from "../../Filter/FilterDropdown/FilterDropdown";
import FilterByName from "../../Filter/FilterByName";
import { Context } from "../../../context";

import { InsuranceTypeLabels, StatusLabels } from "../../../types";

type TTableFilter = React.HTMLAttributes<HTMLDivElement>;

const TableFilter: React.FC<TTableFilter> = () => {
  const { providers } = useContext(Context);

  return (
    <>
      <FilterByName />
      <FilterDropdown
        filterKey="provider"
        label="provider"
        options={providers.map((provider: string) => {
          return {
            label: provider,
            value: provider
          }
        })}
      />
      <FilterDropdown
        filterKey="insuranceType"
        label="insurance type"
        options={Object.entries(InsuranceTypeLabels).map(([key, value]) => {
          return {
            label: value,
            value: key
          }
        })}
      />
      <FilterDropdown
        filterKey="status"
        label="status"
        options={Object.entries(StatusLabels).map(([key, value]) => {
          return {
            label: value,
            value: key
          }
        })}
      />
    </>
  )
};

export default React.memo(TableFilter);