import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Context } from "../../../context";
import { contextValue } from "../../../tests/mocks";
import FilterClearButton from "./FilterClearButton";

describe("FilterClearButton", () => {
  test("click on button calls clear filter", () => {
    render(
      <Context.Provider value={contextValue}>
        <FilterClearButton />
      </Context.Provider>)
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(contextValue.clearAllFilters).toHaveBeenCalled();
  })
})