import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  OnChangeFn,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
// Table components
import { TableFilter } from "./TableFilter";
import { TablePagination } from "./TablePagination";

interface ITableComponent<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  paginationOverride: PaginationState;
  pageCount: number;
  onPaginationChange: OnChangeFn<PaginationState>;
}

const TableComponent = <T extends unknown>(options: ITableComponent<T>) => {
  const table = useReactTable({
    data: options.data,
    columns: options.columns,
    pageCount: options.pageCount,
    manualPagination: true,
    manualFiltering: true,
    enableColumnFilters: true,
    state: {
      pagination: options.paginationOverride,
    },
    onPaginationChange: options.onPaginationChange,
    // Pipeline of plugins
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // Debug
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-lg shadow-sm">
              <table className="w-full whitespace-nowrap">
                <thead className="bg-gray-100 border-b">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          colSpan={header.colSpan}
                          className="px-4 py-4 text-sm font-medium text-left text-gray-900"
                        >
                          {header.isPlaceholder ? null : (
                            <div>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {header.column.getCanFilter() ? (
                                <div className="mt-2">
                                  <TableFilter
                                    column={header.column}
                                    table={table}
                                  />
                                </div>
                              ) : null}
                            </div>
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="w-full">
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="border-b">
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <TablePagination table={table} />
    </>
  );
};

export { TableComponent };
