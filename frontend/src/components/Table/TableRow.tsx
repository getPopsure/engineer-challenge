import React from "react";

import Badge from "../Badge";

import { InsuranceTypeLabels, Policy } from "../../types";

interface IProps {
  policy: Policy;
}

const TableRow: React.FC<IProps> = ({ policy }) => (
  <tr className="border-b grid" data-testid="row">
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{policy.id}</td>
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      {policy.customer.firstName} {policy.customer.lastName}
    </td>
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      {policy.provider}
    </td>
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap capitalize">
      {InsuranceTypeLabels[policy.insuranceType]}
    </td>
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      <Badge status={policy.status} />
    </td>
  </tr>
);

export default React.memo(TableRow);