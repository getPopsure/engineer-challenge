import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import ContextProvider from '../context'

interface IProps {
  children: React.ReactNode;
}

const AllTheProviders: React.FC<IProps> = ({ children }) => {
  return (
    <ContextProvider>
      {children}
    </ContextProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders as React.FC<IProps>, ...options })

export * from '@testing-library/react'
export { customRender as render }