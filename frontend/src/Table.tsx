import Badge from "./Badge";
import { Policy } from './types'

interface FilterProps {
  policies: Array<Policy>
}
const Table = ({policies}: FilterProps) => (
  <div className="flex flex-col">
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-lg shadow-sm">
          <table className="min-w-full">
            <thead className="border-b bg-gray-100">
              <tr>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  #
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Name
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Provider
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Type
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {policies
                .flat()
                .map((policy, index) => (
                <tr className="border-b" key={policy.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {`${policy.customer.firstName} ${policy.customer.lastName}`}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {policy.provider}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {policy.insuranceType}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Badge status={policy.status} />
                </td>
              </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
)

export default Table;


