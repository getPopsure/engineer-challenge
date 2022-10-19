import { Input } from "@popsure/dirty-swan";
import { Column, Table as ReactTable } from "@tanstack/react-table";

type TableMetadata = {
  filterComponent?: () => JSX.Element;
};

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

  const metaData = column.columnDef.meta as TableMetadata;

  if (metaData?.filterComponent) {
    return metaData.filterComponent();
  }

  switch (typeof firstValue) {
    case "string":
      return (
        <Input
          value={(columnFilterValue ?? "") as string}
          onChange={(e) => {
            column.setFilterValue(e.target.value);
          }}
          placeholder={`Search...`}
        />
      );

    default:
      return <></>;
  }
};
