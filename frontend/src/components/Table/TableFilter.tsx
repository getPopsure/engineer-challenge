import React, { useContext, useMemo, useState } from "react";
import { Context } from "../../context";
import { Policy } from "../../types";
import Input from "../Input/Input";

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
        <select name="provider" id="provider">
          <option value="">Filter by provider</option>
          {providers.map(provider => <option value={provider}>{provider}</option>)}
        </select>
        <select name="insuranceType" id="insuranceType">
          <option value="">Filter by insurance type</option>
          {insuranceTypes.map(insuranceType => <option value={insuranceType}>{insuranceType}</option>)}
        </select>
        <select name="Status" id="status">
          <option value="">Filter by status</option>
          {status.map(status => <option value={status}>{status}</option>)}
        </select>
      </div>

    </div>

  )
}

export default React.memo(TableFilter);