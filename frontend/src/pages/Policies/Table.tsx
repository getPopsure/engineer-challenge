import Badge from "./Badge";
import Spinner from "../../shared/Spinner";

interface TableProps {
  rowData: Policy[];
  isLoading: boolean;
  hasError: boolean;
}

const COLUMNS = ["#", "Name", "Provider", "Type", "Status"];

const LoadingState = () => (
  <div className="w-full h-screen flex justify-center items-center">
    <Spinner />
  </div>
);

const ErrorState = () => (
  <div className="w-full h-screen flex justify-center items-center">
    Oops! Something went wrong.
  </div>
);

const EmptyState = () => (
  <div className="w-full h-screen flex justify-center items-center">
    No result
  </div>
);

const Table = ({ rowData, isLoading, hasError }: TableProps) => {
  if (isLoading) return <LoadingState />;
  if (hasError) return <ErrorState />;
  if (!rowData.length) return <EmptyState />;
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-lg shadow-sm">
            <table className="min-w-full">
              <thead className="border-b bg-gray-100">
                <tr>
                  {COLUMNS.map((header, idx) => (
                    <th
                      key={idx}
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rowData.map((item, idx) => (
                  <tr key={item.id} className="border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {idx + 1}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {item.customer.firstName} {item.customer.lastName}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {item.provider}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {getTitleCase(item.insuranceType)}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <Badge status={item.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;

const getTitleCase = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
