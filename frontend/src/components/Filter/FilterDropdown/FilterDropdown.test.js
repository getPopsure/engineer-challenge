import '@testing-library/jest-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';

import FilterDropdown from "./FilterDropdown";

import { Context } from "../../../context";
import { contextValue } from "../../../tests/mocks";

describe("Filter Dropdown", () => {
  beforeEach(() => {
    render(
      <Context.Provider value={contextValue}>
        <FilterDropdown
          filterKey="provider"
          label="provider"
          options={[
            { label: "Provider 1", value: "Provider1" },
            { label: "Provider 2", value: "Provider2" },
            { label: "Provider 3", value: "Provider3" },
            { label: "Provider 4", value: "Provider4" },
          ]}
        />
      </Context.Provider>
    )
  });

  test("renders dropdown button", () => {
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(within(button).getByText(/provider/i)).toBeInTheDocument();
  })
  test("click on button opens dropdown", () => {
    const button = screen.getByRole("button");
    const options = screen.getByTestId("filter-dropdown-options");

    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(options).toHaveAttribute("aria-hidden", "true");

    fireEvent.click(button)

    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(options).toHaveAttribute("aria-hidden", "false");
  })
  test("renders four options", () => {
    const button = screen.getByRole("button");
    const options = screen.getByTestId("filter-dropdown-options");

    fireEvent.click(button);

    expect(within(options).getAllByRole("checkbox")).toHaveLength(4);
  })
})