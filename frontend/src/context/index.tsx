import React, { createContext, useEffect, useMemo, useState } from "react"
import { getPolicies } from "../api";
import { Policy, Status, Customer } from "../types";
import getCustomerName from "../utils/getCustomerName";

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
  const [nameQuery, setNameQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [filtersCount, setFiltersCount] = useState(0);
  const [filters, setFilters] = useState<Filters>({
    provider: [],
    insuranceType: [],
    status: []
  });
  // stores the filters that are currently active
  const activeFilters = useMemo(() => {
    return Object.keys(filters).reduce((acc: string[], filterKey: string) => {
      if (filters[filterKey].length > 0) acc.push(filterKey);
      return acc;
    }, []);
  }, [filters])


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

  const [policies, setPolicies] = useState<Policy[]>([]);

  const filteredPolicies = useMemo(() => {
    if (filtersCount === 0) return policies;

    let filtered = policies;

    // filter by name
    if (nameQuery) {
      filtered = filtered.filter(({ customer }) => getCustomerName(customer).toLowerCase().includes(nameQuery))
    }

    // filter by params
    filtered = filtered.filter(policy => {
      let i = 0;
      while (i < activeFilters.length) {
        const filterKey = activeFilters[i] as keyof Pick<Policy, "provider" | "insuranceType" | "status">;
        const policyValue = policy[filterKey].toLowerCase();
        if (!filters[filterKey].includes(policyValue))
          return false;
        i++;
      }
      return true;
    })
    return filtered;

  }, [policies, filters, nameQuery])

  // initial data setup
  useEffect(() => {
    const response = getPolicies();
    const filteredPolicies = response.filter(policy => [Status.ACTIVE, Status.PENDING].includes(policy.status))
    setPolicies(filteredPolicies as Policy[]);
  }, []);

  return (
    <Context.Provider
      value={{
        filteredPolicies,
        filters,
        filtersCount,
        policies,
        addFilter,
        removeFilter,
        clearAllFilters,
        setNameQuery,
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