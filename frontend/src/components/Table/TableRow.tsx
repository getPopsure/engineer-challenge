import React from "react";
import Badge from "../Badge";

const TableRow: React.FC<any> = ({ policy }) => {
  const { customer } = policy;
  const customerFullName = `${customer.firstName} ${customer.lastName}`
  return (
    <tr className="border-b">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{policy.id}</td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {customerFullName}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {policy.provider}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap capitalize">
        {policy.insuranceType}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        <Badge status={policy.status} />
      </td>
    </tr>
  )
}

export default React.memo(TableRow);