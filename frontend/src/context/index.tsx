import React, { createContext, useState } from "react"

export type Filters = Record<string, string[]>

export const Context = createContext<any>({
  filters: {
    provider: [],
    type: [],
    status: []
  }
});

interface Props {
  children?: React.ReactNode
}

const ContextProvider: React.FC<Props> = ({ children }) => {
  const [filters, setFilters] = useState<Filters>({
    provider: [],
    type: [],
    status: []
  });

  const addFilter = (filterKey: string, value: string) => {
    const updatedFilters = Object.assign({}, filters);
    updatedFilters[filterKey].push(value);
    setFilters(updatedFilters);
  }
  const removeFilter = (filterKey: string, value: string) => {
    const updatedFilters = Object.assign({}, filters);
    updatedFilters[filterKey] = filters[filterKey].filter((val: string) => val !== value);
    setFilters(updatedFilters);
  }

  return (
    <Context.Provider
      value={{ filters, addFilter, removeFilter }}
    >
      {children}
    </Context.Provider>
  );
};
export default ContextProvider;