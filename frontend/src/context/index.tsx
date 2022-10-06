import React, { createContext, useEffect, useState } from "react"
import { getPolicies } from "../api";
import { Policy, Status } from "../types";
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

  const filterByKey = (key: FilterKeys) => {
    if (filters[key].length === 0)
      return policies;

    return policies.filter(policy =>
      filters[key].includes(policy[key].toLowerCase()))
  }

  const [policies, setPolicies] = useState<Policy[]>([]);
  const [filteredPolicies, setFilteredPolicies] = useState<Policy[]>([]);

  useEffect(() => {
    let filteredByParam: Record<FilterKeys, Policy[]> = {
      provider: [],
      insuranceType: [],
      status: []
    };

    // OR filter: filter policies by each key (provider, type, status) and save in the `filtered` variabel
    (Object.keys(filters) as Array<FilterKeys>)
      .forEach((filterKey) => {
        filteredByParam[filterKey] = filterByKey(filterKey)
      })

    // OR filter: store filter by customer full name
    const filteredByName: Policy[] = nameQuery === ""
      ? policies
      : policies.filter(({ customer }) => getCustomerName(customer).toLowerCase().includes(nameQuery))

    // AND filter: get only the values that show up on all the params, the intersection of the 3 filters and the name search
    let result = Object.values({ ...filteredByParam, filteredByName })
      .reduce((a, b) => b.filter(Set.prototype.has, new Set(a)));

    setFilteredPolicies(result)

  }, [policies, filters, nameQuery]);

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