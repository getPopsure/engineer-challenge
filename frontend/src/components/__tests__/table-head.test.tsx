import { render } from "@testing-library/react";
import { TableHead } from "../table-head";

describe("Table head", () => {
  it("should render the table head", () => {
    const { container } = render(<TableHead columns={[]} />);
    expect(container.querySelector("thead")).toBeInTheDocument();
  });

  it("should contain all the columns", () => {
    const { container } = render(
      <TableHead
        columns={[
          {
            name: "Name",
            type: "text",
          },
          {
            name: "Email",
            type: "text",
          },
          {
            name: "Status",
            type: "text",
          },
        ]}
      />
    );

    expect(container.querySelectorAll("th")).toHaveLength(3);
  });
});
