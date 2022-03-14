import { render, fireEvent, waitFor } from "@testing-library/react";
import PolicyTableTextFilter from "./PolicyTableTextFilter";

describe("Input element", () => {
  it("renders correctly", () => {
    const { queryByPlaceholderText, queryByText } = render(
      <PolicyTableTextFilter onFilterChange={() => {}} />
    );

    expect(queryByText("Search")).toBeTruthy();
    expect(queryByText("🔍")).toBeTruthy();
    expect(queryByPlaceholderText("Search for items")).toBeTruthy();
  });

  it("updates immideately on change", () => {
    const { queryByPlaceholderText } = render(
      <PolicyTableTextFilter onFilterChange={() => {}} />
    );

    const input = queryByPlaceholderText(
      "Search for items"
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Snyder" } });
    expect(input.value).toBe("Snyder");
  });

  it("does nothing without input change", () => {
    const onFilterChange = jest.fn();
    const { queryByPlaceholderText } = render(
      <PolicyTableTextFilter onFilterChange={onFilterChange} />
    );

    fireEvent.click(queryByPlaceholderText("Search for items")!);
    expect(onFilterChange).not.toBeCalled();
  });

  it("fires callback immideately on change", () => {
    const onFilterChange = jest.fn();
    const { queryByPlaceholderText } = render(
      <PolicyTableTextFilter onFilterChange={onFilterChange} />
    );

    const input = queryByPlaceholderText(
      "Search for items"
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Snyder" } });
    expect(onFilterChange).toBeCalledWith<string[]>("Snyder");
  });

  it("throttles input", async () => {
    const onFilterChange = jest.fn();
    const { queryByPlaceholderText } = render(
      <PolicyTableTextFilter onFilterChange={onFilterChange} />
    );

    const input = queryByPlaceholderText(
      "Search for items"
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Snyder" } });
    expect(onFilterChange).toBeCalledWith<string[]>("Snyder");

    fireEvent.change(input, { target: { value: "James" } });
    await waitFor(
      () => {
        expect(onFilterChange).toBeCalledWith<string[]>("James");
      },
      { timeout: 1100 }
    );
  });
});
