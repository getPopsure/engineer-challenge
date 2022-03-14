import { fireEvent, render } from "@testing-library/react";
import PolicyTableInsuranceTypeFilter from "./PolicyTableInsuranceTypeFilter";

const emptyValue: string[] = [];
const defaultValue = ["HEALTH", "HOUSEHOLD", "LIABILITY"];

describe("Input", () => {
  it("renders correctly", () => {
    const { queryByText } = render(
      <PolicyTableInsuranceTypeFilter
        value={defaultValue}
        onFilterChange={() => {}}
      />
    );

    expect(queryByText("Insurance Types")).toBeTruthy();
    expect(queryByText("Health 🚑")).toBeTruthy();
    expect(queryByText("Household 🏠")).toBeTruthy();
    expect(queryByText("Liability 💼")).toBeTruthy();
  });

  it("does nothing without input change", () => {
    const onFilterChange = jest.fn();
    const { queryByText } = render(
      <PolicyTableInsuranceTypeFilter
        value={defaultValue}
        onFilterChange={onFilterChange}
      />
    );

    fireEvent.click(queryByText("Insurance Types")!);
    expect(onFilterChange).not.toBeCalled();
  });

  it("changes filter on unchecking value", () => {
    const onFilterChange = jest.fn();
    const { queryByText } = render(
      <PolicyTableInsuranceTypeFilter
        value={defaultValue}
        onFilterChange={onFilterChange}
      />
    );

    fireEvent.click(queryByText(/health/i) as HTMLInputElement);
    expect(onFilterChange).toBeCalledWith<string[][]>([
      "HOUSEHOLD",
      "LIABILITY",
    ]);
  });

  it("changes filter on checking value", () => {
    const onFilterChange = jest.fn();
    const { queryByText } = render(
      <PolicyTableInsuranceTypeFilter
        value={emptyValue}
        onFilterChange={onFilterChange}
      />
    );

    fireEvent.click(queryByText(/health/i) as HTMLInputElement);
    expect(onFilterChange).toBeCalledWith(["HEALTH"]);
  });
});
