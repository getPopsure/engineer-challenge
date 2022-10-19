import { Table } from "@tanstack/table-core";

interface ITablePagination<T> {
  table: Table<T>;
}

export const TablePagination = <T extends unknown>({
  table,
}: ITablePagination<T>) => {
  return (
    <>
      <div className="bg-gray-100">
        <div className="px-4 py-12">
          <div className="w-full px-4 py-4 mx-auto">
            <div className="flex items-center w-full">
              <div
                aria-label="pagination"
                className="flex items-center justify-center w-full"
              >
                <div className="flex items-center lg:gap-4 md:gap-3">
                  <button
                    className={`w-10 h-10 p-1 border rounded ${
                      table.getCanPreviousPage()
                        ? "cursor-pointer"
                        : "cursor-not-allowed"
                    }`}
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke={
                        table.getCanPreviousPage() ? "currentColor" : "#ccc"
                      }
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                      />
                    </svg>
                  </button>
                  <button
                    className={`w-10 h-10 p-1 border rounded ${
                      table.getCanPreviousPage()
                        ? "cursor-pointer"
                        : "cursor-not-allowed"
                    }`}
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke={
                        table.getCanPreviousPage() ? "currentColor" : "#ccc"
                      }
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>
                  </button>
                  <button
                    className={`w-10 h-10 p-1 border rounded ${
                      table.getCanNextPage()
                        ? "cursor-pointer"
                        : "cursor-not-allowed"
                    }`}
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke={table.getCanNextPage() ? "currentColor" : "#ccc"}
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>
                  <button
                    className={`w-10 h-10 p-1 border rounded ${
                      table.getCanNextPage()
                        ? "cursor-pointer"
                        : "cursor-not-allowed"
                    }`}
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke={table.getCanNextPage() ? "currentColor" : "#ccc"}
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>
                  <span className="flex items-center gap-1">
                    <strong>
                      {table.getState().pagination.pageIndex + 1} of{" "}
                      {table.getPageCount()}
                    </strong>
                  </span>
                  <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                      table.setPageSize(Number(e.target.value));
                    }}
                    className="w-24 p-1 border border-gray-300 rounded"
                  >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
