import { Input } from "@popsure/dirty-swan";
import { Column, Table as ReactTable } from "@tanstack/react-table";
import { useAppDispatch } from "~/src/store/hooks";

type TableMetadata = {
  filterComponent?: ({ column }: { column: Column<any, any> }) => JSX.Element;
  customFilterAction?: ({
    value,
    dispatch,
  }: {
    value: any;
    dispatch: any;
  }) => void;
};

export const TableFilter = ({
  column,
  table,
}: {
  column: Column<any, any>;
  table: ReactTable<any>;
}) => {
  const dispatch = useAppDispatch();

  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const metaData = column.columnDef.meta as TableMetadata;

  if (metaData?.filterComponent) {
    return metaData.filterComponent({ column });
  }

  switch (typeof firstValue) {
    case "string":
    default:
      return (
        <Input
          value={(columnFilterValue ?? "") as string}
          onChange={(e) => {
            const value =
              e.target.value && e.target.value !== ""
                ? e.target.value
                : undefined;

            // Set5 value to react-table
            column.setFilterValue(value);
            // Trigger custom filter action if present
            if (metaData?.customFilterAction) {
              metaData.customFilterAction({
                value,
                dispatch,
              });
            }
          }}
          placeholder={`Search...`}
        />
      );
  }
};
