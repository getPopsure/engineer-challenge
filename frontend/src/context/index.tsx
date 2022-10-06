import React, { createContext, useEffect, useMemo, useState } from "react"
import { getPolicies } from "../api";
import { Policy, Status, Customer } from "../types";
import getCustomerName from "../utils/getCustomerName";

type FilterKeys = "provider" | "insuranceType" | "status";
export type Filters = Record<FilterKeys, string[]>

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

  const addFilter = (filterKey: FilterKeys, value: string) => {
    const updatedFilters = Object.assign({}, filters);
    updatedFilters[filterKey].push(value.toLowerCase());
    setFilters(updatedFilters);
    setFiltersCount(count => count + 1);
  }
  const removeFilter = (filterKey: FilterKeys, value: string) => {
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
  const [filteredPolicies, setFilteredPolicies] = useState<Policy[]>([]);

  useEffect(() => {
    let filtered: Record<FilterKeys, Policy[]> = {
      provider: [],
      insuranceType: [],
      status: []
    };

    // OR filter: filter policies by each key (provider, type, status) and save in the `filtered` variabel
    (Object.entries(filters) as Array<[FilterKeys, string[]]>)
      .forEach(([filterKey, filterValues]) => {
        if (filterValues.length === 0) {
          filtered[filterKey] = policies;
          return;
        }
        filtered[filterKey] = policies.filter(policy =>
          filterValues.includes(policy[filterKey].toLowerCase()))
      })

    // AND filter: filter in only values that show up on all the params, the intersection of the 3 filters
    let result = Object.values(filtered)
      .reduce((a, b) => b.filter(Set.prototype.has, new Set(a)));

    setFilteredPolicies(result)

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