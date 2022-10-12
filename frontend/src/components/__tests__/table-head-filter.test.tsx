import { render } from "@testing-library/react";
import { TableHeadFilter } from "../table-head-filter";

describe("Table head filter", () => {
  it("should render text filter", () => {
    const { container } = render(<TableHeadFilter type="text" name="test" />);

    expect(container.querySelector("input[type=search]")).toBeInTheDocument();
  });

  it("should render select", () => {
    const { getByRole } = render(
      <TableHeadFilter
        type="select"
        name="Status"
        options={["test 1", "test 2", "3rd value"]}
        selected={["ACTIVE"]}
        filterState={{
          Status: ["ACTIVE", "CANCELLED", "DROPPED_OUT"],
        }}
      />
    );

    expect(getByRole("combobox")).toBeInTheDocument();
  });
});
