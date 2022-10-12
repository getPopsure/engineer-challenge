import { render } from "@testing-library/react";
import { Pager } from "../pager";

describe("Pager", () => {
  it("Check if pager is rendered correctly", () => {
    const handler = jest.fn();
    const { getAllByRole } = render(
      <Pager totalPages={10} onPageChange={handler} />
    );

    expect(getAllByRole("button")).toHaveLength(10);
  });

  it("Check if the button is called correctly", () => {
    const handler = jest.fn();
    const { getAllByRole } = render(
      <Pager totalPages={10} onPageChange={handler} />
    );

    const buttons = getAllByRole("button");
    buttons[0].click();
    expect(handler).toBeCalledTimes(1);
  });

  it("check if the active button is having the correct class", () => {
    const handler = jest.fn();
    const { getAllByRole } = render(
      <Pager totalPages={10} onPageChange={handler} activePage={3} />
    );

    const buttons = getAllByRole("button");
    expect(buttons[2]).toHaveClass("bg-gray-600");
  });
});
