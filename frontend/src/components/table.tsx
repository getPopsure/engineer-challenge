import { FunctionComponent } from "react";
import { TableProps } from "../models/Table";
import { TableBody } from "./table-body";
import { TableHead } from "./table-head";

const Table: FunctionComponent<TableProps> = ({
  records,
  columns,
  onFilterChange,
  filterState,
}) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-lg shadow-sm">
            <table className="min-w-full">
              <TableHead
                columns={columns}
                onFilterChange={onFilterChange}
                filterState={filterState}
              />
              <TableBody records={records} />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Table };
