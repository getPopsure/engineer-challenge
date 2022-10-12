import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Table from "./Table";

import { Context } from '../../../context'
import { contextValue, threePolicies, fifteenPolicies } from "../../../tests/mocks";

describe("Table", () => {
  test("renders table head", () => {
    render(
      <Context.Provider
        value={{
          ...contextValue,
          policies: threePolicies,
          totalPolicies: threePolicies.length
        }}
      >
        <Table />
      </Context.Provider>);
    expect(screen.getByTestId("thead")).toBeInTheDocument();
  })
  test("renders 3 results", () => {
    render(
      <Context.Provider
        value={{
          ...contextValue,
          policies: threePolicies,
          totalPolicies: threePolicies.length
        }}
      >
        <Table />
      </Context.Provider>
    );
    expect(screen.getAllByTestId('row')).toHaveLength(3);
  })
  test("renders 15 results", () => {
    render(
      <Context.Provider
        value={{
          ...contextValue,
          policies: fifteenPolicies,
          totalPolicies: fifteenPolicies.length
        }}
      >
        <Table />
      </Context.Provider>
    );
    expect(screen.getAllByTestId('row')).toHaveLength(15);
  })
})