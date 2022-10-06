import React, { useContext, useMemo, useState } from "react";
import { Context } from "../../context";
import FilterDropdown from "../Filter/FilterDropdown/FilterDropdown";
import Input from "../Form/Input/Input";

type TTableFilter = React.HTMLAttributes<HTMLDivElement>;

const TableFilter: React.FC<TTableFilter> = () => {
  const { setNameQuery } = useContext(Context);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameQuery(e.target.value.toLowerCase())
  }

  return (
    <>
      <Input placeholder="Search" onChange={handleInputChange} />
      <FilterDropdown filterKey="provider" label="provider" />
      <FilterDropdown filterKey="insuranceType" label="insurance type" />
      <FilterDropdown filterKey="status" label="status" />
    </>
  )
}

export default React.memo(TableFilter);