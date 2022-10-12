import { render } from "@testing-library/react";
import { TableRecord } from "../../models/Table";
import { TableBody } from "../table-body";

describe("Table body", () => {
  it("Check if table body is rendered correctly", () => {
    const records: TableRecord[] = [
      {
        id: 1,
        cells: [
          {
            name: "Name",
            value: "John Doe",
          },
          {
            name: "Email",
            value: "",
          },
          {
            name: "Status",
            value: "ACTIVE",
          },
        ],
      },
      {
        id: 2,
        cells: [
          {
            name: "Name",
            value: "Jane Doe",
          },
          {
            name: "Email",
            value: "",
          },
          {
            name: "Status",
            value: "CANCELLED",
          },
        ],
      },
    ];

    const { getAllByRole } = render(<TableBody records={records} />);

    expect(getAllByRole("cell")).toHaveLength(6);
    expect(getAllByRole("row")).toHaveLength(2);
  });
});
