import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Table from ".";
import Badge from "../Badge";

const TABLE_HEADER = 1;
const tableColumns: TableColumn[] = [
  {
    title: "Name",
    accessor: "name",
  },
  {
    title: "Status",
    customRow: (row: Policy) => (
      <span>
        <Badge status={row.status} />
      </span>
    ),
  },
];
const createFakeRows = (rowsNumber: number) => {
  const tableRows: any[] = [];
  Array.from(Array(rowsNumber)).forEach((rowNumber, index) => {
    tableRows.push({
      name: `mock_row_${index + 1}`,
      status: "ACTIVE",
    });
  });
  return tableRows;
};
const renderTable = ({ rowsNumber }: { rowsNumber: number }) => {
  const rows = createFakeRows(rowsNumber);
  render(
    <Table
      columns={tableColumns}
      rows={rows}
      isLoading={false}
      isError={false}
    ></Table>
  );
};

describe("The table renders itself and different types of cols correctly", () => {
  test("A normal row", async () => {
    renderTable({ rowsNumber: 1 });
    expect(
      await screen.findByRole("row", {
        name: /mock_row_1/,
      })
    ).toBeInTheDocument();
  });
  test("A custom row", async () => {
    renderTable({ rowsNumber: 1 });
    expect(
      await screen.findByRole("row", {
        name: /ACTIVE/,
      })
    ).toBeInTheDocument();
  });
});

describe("The pagination renders and works correctly", () => {
  test("When I change the page size, then the table changes accordingly and the pages buttons are present", async () => {
    const ROWS_NUMBER = 40;
    const PAGE_SIZE = 5;

    renderTable({ rowsNumber: ROWS_NUMBER });
    const pageSizeComboBox = await screen.findByRole("combobox", {
      name: "Page size",
    });
    userEvent.selectOptions(pageSizeComboBox, String(PAGE_SIZE));
    expect(await screen.findAllByRole("row")).toHaveLength(5 + TABLE_HEADER);
    expect(await screen.findAllByRole("button")).toHaveLength(
      ROWS_NUMBER / PAGE_SIZE
    );
  });
});
