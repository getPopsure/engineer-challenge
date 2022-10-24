import React from "react";
import Badge from "../Badge";

const TableRow: React.FC<any> = ({ policy }) => {
  const { firstName, lastName } = policy;
  const customerFullName = `${firstName} ${lastName}`
  return (
    <tr className="border-b">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{policy.id}</td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {policy.name}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {policy.provider}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap capitalize">
        {policy.type}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        <Badge status={policy.status} />
      </td>
    </tr>
  )
}

export default React.memo(TableRow);