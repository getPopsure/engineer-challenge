import React, { useContext, useState, useEffect, createContext, useCallback, ChangeEvent } from "react";
import {TPolicy} from "../types";

type TPolicies = {
  policies: TPolicy[];
  providers: any;
  types: any;
  status: any;
}

type ContextProps = {
  state: TPolicies;
  handleNameFilter?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFilter: (filter: string, value: string) => void;
}

const defaultState = {
  policies: [],
  providers: [],
  types: [],
  status: [],
}

// @ts-ignore
const AppContext = createContext<ContextProps>(defaultState);
const POLICIES = 'policies'

export const AppContextProvider = ({ children }: { children : React.ReactNode }) => {
  const [state, setState] = useState<TPolicies>(defaultState);
  const [nameFilter, setNameFilter] = useState('')

  const handleNameFilter = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const filterValue = event.target.value
    const filteredPoliciesByName = state.policies.filter(policy =>
      policy.customer.firstName.toLowerCase().includes(filterValue)
      || policy.customer.lastName.toLowerCase().includes(filterValue))

    // setNameFilter(event.target.value)
    // @ts-ignore
    // setState((prevState) => {
    //   return {
    //     ...prevState,
    //     policies: prevState.policies.filter(policy =>
    //       policy.customer.firstName.toLowerCase().includes(filterValue)
    //       || policy.customer.lastName.toLowerCase().includes(filterValue))
    //   }
    // })
  }, [])

  const parsePolicies = (policies) => {
    // @Todo: Refactor the filter !
    const filteredPoliciesByStatus = policies.filter(policy => policy.status === "ACTIVE" || policy.status === "PENDING")

    const appState = {
      policies: filteredPoliciesByStatus,
      providers: [...new Set(filteredPoliciesByStatus.map(policy => policy.provider))],
      types: [...new Set(filteredPoliciesByStatus.map(policy => policy.insuranceType))],
      status: [...new Set(filteredPoliciesByStatus.map(policy => policy.status))]
    }

    setState((prevState) => ({
      ...prevState,
      ...appState
    }))
  }

  const handleFilter = (filter, value) => {
    console.log('filter', filter)
    console.log('value', value)
  }

  useEffect(() => {
    (async () => {
      try {
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/${POLICIES}`)

        if (response.ok) {
          let data = await response.json()
          parsePolicies(data)
        }
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  return (
    <AppContext.Provider
      value={{
        state,
        handleNameFilter,
        onFilter: handleFilter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
