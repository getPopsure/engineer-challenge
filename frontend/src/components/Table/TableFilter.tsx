import { Input } from "@popsure/dirty-swan";
import { Column, Table as ReactTable } from "@tanstack/react-table";
import { useMemo } from "react";

export const TableFilter = ({
  column,
  table,
}: {
  column: Column<any, any>;
  table: ReactTable<any>;
}) => {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === "number"
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );

  return typeof firstValue === "number" ? (
    <></>
  ) : (
    <Input
      value={(columnFilterValue ?? "") as string}
      onChange={(e) => {
        column.setFilterValue(e.target.value);
      }}
      placeholder={`Cerca...`}
    />
  );
};
