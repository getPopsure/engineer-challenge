import React, { createContext, useEffect, useState } from "react"
import { getPolicies } from "../api";
import { Policy, Filters } from "../types";

export const Context = createContext<any>({});

interface Props {
  children?: React.ReactNode
}

const initialFilters: Filters = {
  status: ["ACTIVE", "PENDING"]
}

const ContextProvider: React.FC<Props> = ({ children }) => {
  // store policies, limited by `resultsPerPage`
  const [policies, setPolicies] = useState<Policy[]>([]);
  // total amount of policies saved in the db
  const [totalPolicies, setTotalPolicies] = useState(0);

  // variables used in pagination
  const resultsPerPage = 10;
  const [page, setPage] = useState(0);

  // variables used in filter and search
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

  useEffect(() => {
    const getData = async () => {
      const pagination = {
        page,
        resultsPerPage
      }
      const response = await getPolicies(filters, pagination);
      setPolicies(response.policies);
      setTotalPolicies(response.count);
    }
    getData();
  }, [page])

  // initial data setup
  useEffect(() => {
    const getData = async () => {
      const pagination = {
        page: 0,
        resultsPerPage
      }
      const response = await getPolicies(filters, pagination);
      setTotalPolicies(response.count);
      setPolicies(response.policies);
    }
    getData();
  }, []);

  return (
    <Context.Provider
      value={{
        page,
        totalPolicies,
        resultsPerPage,
        filters,
        policies,
        addFilter,
        removeFilter,
        clearAllFilters,
        setNameQuery,
        setPage
      }}
    >
      {children}
    </Context.Provider>
  );
};
export default ContextProvider;