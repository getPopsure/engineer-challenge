import Badge from "./Badge";

type TableProps = {
  columns: string[];
  rows: Policy[];
  isLoading: boolean;
  isError: boolean;
};
const Table = (props: TableProps) => {
  if (props.isLoading) return <div>Loading</div>;
  if (props.isError) return <div>Ooops something went wrong</div>;
  if (!props.rows.length) return <div>No data to be shown</div>;
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-lg shadow-sm">
            <table className="min-w-full">
              <thead className="border-b bg-gray-100">
                <tr>
                  {props.columns.map((column) => {
                    return (
                      <th
                        key={column}
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        {column}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {props.rows.map((singleRow, rowIndex) => {
                  return (
                    <tr key={`row-${rowIndex}`} className="border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {rowIndex + 1}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {`${singleRow.customer.firstName} ${singleRow.customer.lastName}`}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {singleRow.provider}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {singleRow.insuranceType}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <Badge status={singleRow.status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
