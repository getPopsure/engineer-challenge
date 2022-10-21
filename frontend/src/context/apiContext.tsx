import React, {useContext, useState, useEffect, createContext, useMemo} from "react";
import { TPolicy } from "../types";
import {serializePolicies} from "../serializer";


// Todo: Fix Types
type TPolicies = {
  policies: TPolicy[];
  providers: any;
  type: any;
  status: any;
}

type ContextProps = {
  state: TPolicies;
  // handleNameFilter?: (event: ChangeEvent<HTMLInputElement>) => void;
  addFilter: (value: string, id: string) => void;
  resetFilter: () => void;
}

const defaultState = {
  policies: [],
  providers: [],
  type: [],
  status: [],
}

// @ts-ignore
const AppContext = createContext<ContextProps>(defaultState);
const POLICIES = 'policies'

export const AppContextProvider = ({ children }: { children : React.ReactNode }) => {
  const [initialData, setInitialData] = useState([])
  const [state, setState] = useState<TPolicies>(defaultState);
  const [query, setQuery] = useState({})

  const addFilter = (value, filter) => {
    setQuery((prev) => ({
      ...prev,
      [filter]: value
    }))
  }

  const filteredPolicies = useMemo(() => {
    return state.policies.filter(policy => {
      return Object.keys(query).every(filter => {
        console.log(query[filter], policy[filter])
        return query[filter] === policy[filter]
      })
    });
  }, [query])

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      policies: filteredPolicies
    }))
  }, [query])

  const resetFilter = () => {
    setState((prev) => ({
      ...prev,
      policies: initialData
    }))
  }

  const getInitialPolicies = (policies) => {
    // @Todo: Refactor the filter !
    const filteredPoliciesByStatus = policies.filter(policy => policy.status === "ACTIVE" || policy.status === "PENDING")

    const appState = {
      policies: filteredPoliciesByStatus,
      providers: [...new Set(filteredPoliciesByStatus.map(policy => policy.provider))],
      type: [...new Set(filteredPoliciesByStatus.map(policy => policy.type))],
      status: [...new Set(filteredPoliciesByStatus.map(policy => policy.status))]
    }

    console.log(appState)

    setState((prevState) => ({
      ...prevState,
      ...appState
    }))
    setInitialData(appState.policies)
  }

  useEffect(() => {
    (async () => {
      try {
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/${POLICIES}`)

        if (response.ok) {
          let data = await response.json()
          const serializedPolicies = serializePolicies(data)
          getInitialPolicies(serializedPolicies)
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
        addFilter,
        resetFilter,
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
