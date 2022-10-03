import React, { createContext, useState } from "react"

export type Filters = Record<string, string[]>

export const Context = createContext<any>({
  provider: [],
  type: [],
  status: []
});

interface Props {
  children?: React.ReactNode
}

const ContextProvider: React.FC<Props> = ({ children }) => {
  const [filtersCount, setFiltersCount] = useState(0);
  const [filters, setFilters] = useState<Filters>({
    provider: [],
    type: [],
    status: []
  });

  const addFilter = (filterKey: string, value: string) => {
    const updatedFilters = Object.assign({}, filters);
    updatedFilters[filterKey].push(value);
    setFilters(updatedFilters);
    setFiltersCount(count => count + 1);
  }
  const removeFilter = (filterKey: string, value: string) => {
    const updatedFilters = Object.assign({}, filters);
    updatedFilters[filterKey] = filters[filterKey].filter((val: string) => val !== value);
    setFilters(updatedFilters);
    setFiltersCount(count => count - 1);
  }
  const clearAllFilters = () => {
    setFilters({
      provider: [],
      type: [],
      status: []
    });
    setFiltersCount(0);
  }

  return (
    <Context.Provider
      value={{ filters, addFilter, removeFilter, clearAllFilters, filtersCount }}
    >
      {children}
    </Context.Provider>
  );
};
export default ContextProvider;