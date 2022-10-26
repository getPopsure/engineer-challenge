import { useEffect, useState } from "react";
import useTable from "../../hooks/useTable";
import TableFooter from "./TableFooter";

type TableProps = {
  columns: TableColumn[];
  rows: any[];
  isLoading: boolean;
  isError: boolean;
};
const Table = (props: TableProps) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(30);

  const { currentPageData, totalPages, initialRowNumber, finalRowNumber } =
    useTable(props.rows, currentPageNumber, pageSize);
  const changePageSize = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPageNumber(1);
  };
  useEffect(() => {
    setCurrentPageNumber(1);
  }, [totalPages]);
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
                <tr key="table-cols">
                  <th
                    key="#"
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    #
                  </th>
                  {props.columns.map((column, columnHeaderIndex) => {
                    return (
                      <th
                        key={`colum-header-${columnHeaderIndex}`}
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        {column.title}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody data-testid="table-body">
                {currentPageData.map((singleRow: any, rowIndex: number) => {
                  return (
                    <tr key={`row-${rowIndex}`} className="border-b">
                      <td
                        key={`row-${rowIndex}-col-0`}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                      >
                        {rowIndex + initialRowNumber}
                      </td>
                      {props.columns.map((singleColumn: any, colIndex) => {
                        const columnKey = `row-${rowIndex}-column-${colIndex}`;
                        if (singleColumn.accessor) {
                          return (
                            <td
                              key={columnKey}
                              className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                            >
                              <span>{singleRow[singleColumn.accessor]}</span>
                            </td>
                          );
                        }
                        if (singleColumn.customRow) {
                          return (
                            <td
                              key={columnKey}
                              className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                            >
                              {singleColumn.customRow(singleRow)}
                            </td>
                          );
                        }
                        return (
                          <td
                            key={columnKey}
                            className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                          ></td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <TableFooter
              totalRows={props.rows.length}
              initialValue={pageSize}
              currentPageNumber={currentPageNumber}
              initialRowNumber={initialRowNumber}
              finalRowNumber={finalRowNumber}
              totalPages={totalPages}
              onClickPage={setCurrentPageNumber}
              onClickPageSize={changePageSize}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
