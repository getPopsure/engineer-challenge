import React, { useContext, useMemo, useState } from "react";
import { Context } from "../../context";
import { Policy } from "../../types";
import FilterDropdown from "../Filter/FilterDropdown/FilterDropdown";
import Input from "../Form/Input/Input";

import styles from "./Table.module.scss";

type TTableFilter = React.HTMLAttributes<HTMLDivElement>;

const TableFilter: React.FC<TTableFilter> = () => {
  const { policies, setNameQuery } = useContext(Context);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameQuery(e.target.value.toLowerCase())
  }

  const providers: string[] = useMemo(() => {
    return Array.from(new Set(policies.map((policy: Policy) => policy.provider.toLowerCase())))
  }, [policies]);
  const insuranceTypes: string[] = useMemo(() => {
    return Array.from(new Set(policies.map((policy: Policy) => policy.insuranceType.toLowerCase())))
  }, [policies]);
  const status: string[] = useMemo(() => {
    return Array.from(new Set(policies.map((policy: Policy) => policy.status.toLowerCase())))
  }, [policies]);

  return (
    <div className="py-4">
      <div className={styles.grid}>
        <p></p>
        <Input placeholder="Search" onChange={handleInputChange} />
        <FilterDropdown filterKey="provider" label="provider" />
        <FilterDropdown filterKey="insuranceType" label="insurance type" />
        <FilterDropdown filterKey="status" label="status" />
      </div>

    </div>

  )
}

export default React.memo(TableFilter);