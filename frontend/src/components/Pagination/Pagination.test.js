import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import Pagination from "./Pagination";

import { Context } from "../../context";
import { contextValue as defaultContextValue, fifteenPolicies } from "../../tests/mocks";

const contextValue = {
  ...defaultContextValue,
  policies: fifteenPolicies,
  totalPolicies: fifteenPolicies.length
}

describe("Pagination", () => {
  test("renders list of pages", () => {
    render(
      <Context.Provider value={contextValue}>
        <Pagination />
      </Context.Provider>);
    const paginationButtons = screen.getAllByTestId("paginationButton");
    expect(paginationButtons).toHaveLength(2);
  })
  test("renders previous button", () => {
    render(
      <Context.Provider value={contextValue}>
        <Pagination />
      </Context.Provider>);
    expect(screen.getByText(/Prev/i)).toBeInTheDocument();
  })
  test("renders next button", () => {
    render(
      <Context.Provider value={contextValue}>
        <Pagination />
      </Context.Provider>);
    expect(screen.getByText(/Next/i)).toBeInTheDocument();
  })
  test("go to next page", () => {
    render(
      <Context.Provider value={contextValue}>
        <Pagination />
      </Context.Provider>);
    const nextButton = screen.getByText(/Next/i);
    fireEvent.click(nextButton);
    expect(contextValue.goToNextPage).toHaveBeenCalled();
  })
  test("go to previous page", () => {
    render(
      <Context.Provider
        value={{
          ...contextValue,
          page: 1,
        }}
      >
        <Pagination />
      </Context.Provider>);

    const prevButton = screen.getByText(/Prev/i);
    fireEvent.click(prevButton);

    expect(contextValue.goToPreviousPage).toHaveBeenCalled();
  })
})