import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';

import TableFilter from './TableFilter';

import { Context } from "../../../context";
import { contextValue } from "../../../tests/mocks";

describe("TableFilter", () => {
  beforeEach(() => {
    render(
      <Context.Provider value={contextValue}>
        <TableFilter />
      </Context.Provider>
    )
  });
  test("renders name search input", () => {
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  })
  test("renders providers filter", () => {
    const dropdown = screen.getByTestId("filter-dropdown-provider");
    expect(within(dropdown).getByText(/provider/i)).toBeInTheDocument();
  })
  test("renders insurance types filter", () => {
    const dropdown = screen.getByTestId("filter-dropdown-insuranceType");
    expect(within(dropdown).getByText(/insurance type/i)).toBeInTheDocument();
  })
  test("renders status filter", () => {
    const dropdown = screen.getByTestId("filter-dropdown-status");
    expect(within(dropdown).getByText(/status/i)).toBeInTheDocument();
  })
})