import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Context } from '../context'
import { Policy } from '../types';

import { threePolicies } from "./mocks";

interface IProps {
  children: React.ReactNode;
  policies: Policy[];
}

const AllTheProviders: React.FC<IProps> = ({ children, policies = threePolicies }) => {
  return (
    <Context.Provider
      value={{
        filters: {},
        page: 0,
        policies,
        providers: [],
        resultsPerPage: 10,
        totalPolicies: policies.length
      }}
    >
      {children}
    </Context.Provider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders as React.FC<IProps>, ...options })

export * from '@testing-library/react'
export { customRender as render }