import { Policy } from 'features/Policies';

import { Badge } from '../Badge';

interface TableRowProps {
  row: Policy;
}

export const TableRow = ({ row }: TableRowProps) => (
  <tr className="border-b">
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      {row.customer.firstName} {row.customer.lastName}
    </td>
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      {row.provider}
    </td>
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      {row.insuranceType}
    </td>
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      <Badge status={row.status} />
    </td>
  </tr>
);
