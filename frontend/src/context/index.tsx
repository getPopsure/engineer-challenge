import React, { createContext, useEffect, useState } from "react"
import { getPolicies } from "../api";
import { Policy, Filters } from "../types";
import getCustomerName from "../utils/getCustomerName";

export const Context = createContext<any>({});

interface Props {
  children?: React.ReactNode
}

const initialFilters: Filters = {
  status: ["ACTIVE", "PENDING"]
}

const ContextProvider: React.FC<Props> = ({ children }) => {
  const [nameQuery, setNameQuery] = useState("");
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const addFilter = (filterKey: keyof Filters, value: Filters[keyof Filters]) => {
    const updatedFilters = Object.assign({}, filters) as Filters;

    // if there are no values, remove such filter param from the filters
    if (!value) {
      removeFilter(filterKey);
      return;
    }

    if (updatedFilters.hasOwnProperty(filterKey)) {
      // @ts-ignore
      updatedFilters[filterKey]!.push(value);
    } else {
      // @ts-ignore
      updatedFilters[filterKey] = [value]
    }

    setFilters(updatedFilters);
  }
  const removeFilter = (filterKey: keyof Filters, value?: Filters[keyof Filters]) => {
    const updatedFilters = Object.assign({}, filters);

    if (updatedFilters[filterKey]) {
      // @ts-ignore
      updatedFilters[filterKey] = updatedFilters[filterKey].filter((val: string) => val !== value);
    }

    // if no value is sent or no value is left in the array,
    // remove all filters for that param
    if (!value || updatedFilters[filterKey]?.length === 0) {
      delete updatedFilters[filterKey];
    }

    setFilters(updatedFilters);
  }
  const clearAllFilters = () => {
    setFilters(Object.assign({}));
  }

  const [policies, setPolicies] = useState<Policy[]>([]);
  const [filteredPolicies, setFilteredPolicies] = useState<Policy[]>([]);


  // initial data setup
  useEffect(() => {
    const getData = async () => {
      const response = await getPolicies(filters);
      setPolicies(response);

    }
    getData();
  }, []);

  return (
    <Context.Provider
      value={{
        filteredPolicies,
        filters,
        // filtersCount,
        policies,
        addFilter,
        removeFilter,
        clearAllFilters,
        setNameQuery,
        // isFilterOpen,
        // toggleFilter: () => setIsFilterOpen(isOpen => !isOpen),
        // closeFilter: () => setIsFilterOpen(false)
      }}
    >
      {children}
    </Context.Provider>
  );
};
export default ContextProvider;