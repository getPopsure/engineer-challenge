import React, { useContext } from "react";

import Badge from "../Badge";

import { Policy } from "../../types";
import { Context } from "../../context";

import styles from "./Table.module.scss";

interface IProps {
  policy: Policy;
}

const TableRow: React.FC<IProps> = ({ policy }) => {
  const { addFilter } = useContext(Context);

  return (
    <tr className={["border-b", styles.grid].join(" ")}>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{policy.id}</td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {policy.customer.firstName} {policy.customer.lastName}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {policy.provider}
        {/* <button
          className="hover:underline hover:underline-offset-4"
          onClick={() => addFilter("provider", policy.provider)}>
          {policy.provider}
        </button> */}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap capitalize">
        {policy.insuranceType.toLowerCase()}
        {/* <button
          className="capitalize hover:underline hover:underline-offset-4"
          onClick={() => addFilter("insuranceType", policy.insuranceType)}>
          {policy.insuranceType.toLowerCase()}
        </button> */}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        <Badge status={policy.status} />
        {/* <button
          className="hover:underline hover:underline-offset-4"
          onClick={() => addFilter("status", policy.status)}>
          <Badge status={policy.status} />
        </button> */}
      </td>
    </tr>
  )
}

export default React.memo(TableRow);