import Badge from './Badge';
import { PoliciesData } from './App';
import Relatives from './Relatives';

interface PolicyProps {
  policies: PoliciesData[];
}

const Table = ({ policies }: PolicyProps) => (
  <div className='flex flex-col'>
    <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
      <div className='py-2 inline-block min-w-full sm:px-6 lg:px-8'>
        <div className='overflow-hidden rounded-lg shadow-sm'>
          <table className='min-w-full'>
            <thead className='border-b bg-gray-100'>
              <tr>
                <th
                  scope='col'
                  className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                >
                  #
                </th>
                <th
                  scope='col'
                  className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                >
                  Name
                </th>
                <th
                  scope='col'
                  className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                >
                  Provider
                </th>
                <th
                  scope='col'
                  className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                >
                  Type
                </th>
                <th
                  scope='col'
                  className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                >
                  Status
                </th>
                <th
                  scope='col'
                  className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                >
                  Relatives
                </th>
              </tr>
            </thead>
            {policies.length > 0 ? (
              policies.map(
                ({
                  id,
                  customer,
                  provider,
                  status,
                  insuranceType,
                  relatives,
                }: PoliciesData) => (
                  <tbody key={id}>
                    <tr className='border-b'>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                        {id}
                      </td>
                      <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                        <div>{` ${customer.firstName} ${customer.lastName}`}</div>
                      </td>
                      <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                        {provider}
                      </td>
                      <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                        {insuranceType}
                      </td>
                      <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                        <Badge status={status} />
                      </td>
                      <td>
                        <Relatives relatives={relatives} />
                      </td>
                    </tr>
                  </tbody>
                )
              )
            ) : (
              <tbody>
                <tr className='border-b'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    No data matches the search criteria
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  </div>
);
export default Table;
