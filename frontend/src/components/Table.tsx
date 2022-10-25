import { useState } from "react";
import useTable from "../hooks/useTable";
import Badge from "./Badge";
import TableFooter from "./TableFooter";

type TableProps = {
  columns: string[];
  rows: Policy[];
  isLoading: boolean;
  isError: boolean;
};
const Table = (props: TableProps) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(30);

  const { currentPageData, totalPages, initialPage, finalPage } = useTable(
    props.rows,
    currentPageNumber,
    pageSize
  );
  const changePageSize = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPageNumber(1);
  };
  if (props.isLoading)
    return <div className="flex justify-center py-2">Loading</div>;
  if (props.isError)
    return (
      <div className="flex justify-center py-2">Ooops something went wrong</div>
    );
  if (!props.rows.length)
    return <div className="flex justify-center py-2">No data to be shown</div>;
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-lg shadow-sm">
            <table className="min-w-full" data-testid="table-component">
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
              <tbody data-testid="table-body">
                {currentPageData.map((singleRow, rowIndex) => {
                  return (
                    <tr key={`row-${rowIndex}`} className="border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {rowIndex + initialPage}
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
            <TableFooter
              currentPageNumber={currentPageNumber}
              totalPages={totalPages}
              totalRows={props.rows.length}
              initialPage={initialPage}
              finalPage={finalPage}
              onSetPage={setCurrentPageNumber}
              onSetPageSize={changePageSize}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
