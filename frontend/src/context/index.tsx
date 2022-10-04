import React, { createContext, useEffect, useMemo, useState } from "react"
import { getPolicies } from "../api";
import { Policy } from "../types";

export type Filters = Record<string, string[]>

export const Context = createContext<any>({
  provider: [],
  insuranceType: [],
  status: []
});

interface Props {
  children?: React.ReactNode
}

const ContextProvider: React.FC<Props> = ({ children }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [filtersCount, setFiltersCount] = useState(0);
  const [filters, setFilters] = useState<Filters>({
    provider: [],
    insuranceType: [],
    status: []
  });

  const [policies, setPolicies] = useState<Policy[]>([]);
  const filteresPolicies = useMemo(() => {
    if (filtersCount === 0) return policies;

    const activeFilters = Object.keys(filters).reduce((acc: string[], filterKey: string) => {
      if (filters[filterKey].length > 0) acc.push(filterKey);
      return acc;
    }, []);

    const filtered = policies.filter(policy => {
      let i = 0;
      let shouldStay = true;
      while (i < activeFilters.length) {
        const filterKey = activeFilters[i] as keyof Pick<Policy, "provider" | "insuranceType" | "status">;
        const policyValue = policy[filterKey].toLowerCase();
        console.log(filterKey, policyValue, filters[filterKey].includes(policyValue));

        if (!filters[filterKey].includes(policyValue)) {
          shouldStay = false;
          break;
        }
        i++;
      }
      return shouldStay;
    })
    return filtered;

  }, [policies, filters])

  const addFilter = (filterKey: string, value: string) => {
    const updatedFilters = Object.assign({}, filters);
    updatedFilters[filterKey].push(value.toLowerCase());
    setFilters(updatedFilters);
    setFiltersCount(count => count + 1);
  }
  const removeFilter = (filterKey: string, value: string) => {
    const updatedFilters = Object.assign({}, filters);
    updatedFilters[filterKey] = filters[filterKey].filter((val: string) => val !== value.toLowerCase());
    setFilters(updatedFilters);
    setFiltersCount(count => count - 1);
  }
  const clearAllFilters = () => {
    setFilters({
      provider: [],
      insuranceType: [],
      status: []
    });
    setFiltersCount(0);
  }

  useEffect(() => {
    const response = getPolicies();
    setPolicies(response as Policy[]);
  }, []);

  return (
    <Context.Provider
      value={{
        filteresPolicies,
        filters,
        filtersCount,
        policies,
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