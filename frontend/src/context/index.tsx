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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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
      value={{
        filters,
        filtersCount,
        addFilter,
        removeFilter,
        clearAllFilters,
        isFilterOpen,
        toggleFilter: () => setIsFilterOpen(isOpen => !isOpen),
        closeFilter: () => setIsFilterOpen(false)
      }}
    >
      {children}
    </Context.Provider>
  );
};
export default ContextProvider;