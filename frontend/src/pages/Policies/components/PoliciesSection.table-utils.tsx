import { createColumnHelper } from "@tanstack/table-core";
import { Badge } from "~/src/components/Badge";
import { capitalizeString } from "~/src/utils/string-utils";
import { Policy } from "../../../types/tempTypes";

const columnHelper = createColumnHelper<Policy>();

export const tableColumnsPolicies = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: () => <span>#</span>,
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor(
    (row) => `${row?.customer?.firstName} ${row?.customer?.lastName}`,
    {
      id: "customerName",
      cell: (info) => <>{info.getValue()}</>,
      header: () => <span>Name</span>,
    }
  ),
  columnHelper.accessor("provider", {
    header: () => <span>Provider</span>,
    cell: (info) => <>{info.getValue()}</>,
  }),
  columnHelper.accessor("insuranceType", {
    header: () => <span>Type</span>,
    cell: (info) => <div>{capitalizeString(info.getValue())}</div>,
  }),
  columnHelper.accessor("status", {
    header: () => <span>Status</span>,
    cell: (info) => (
      <div>
        <Badge status={info.getValue()} />
      </div>
    ),
  }),
];

export const mapPoliciesToTableData = (policies: Policy[]) => {
  return policies;
};
