import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import FilterChip from './FilterChip';

import { Context } from "../../../context";
import { contextValue } from "../../../tests/mocks";

describe("FilterChip", () => {
  beforeEach(() => {
    render(
      <Context.Provider value={contextValue}>
        <FilterChip filterKey='provider' value='provider' />
      </Context.Provider>)
  });

  test("renders chip", () => {
    expect(screen.getByText(/provider/i)).toBeInTheDocument();
  });

  test("click on button calls removes filter", () => {
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(contextValue.removeFilter).toHaveBeenCalled();
  })
});