import React, {useContext, useState, useEffect, createContext, useMemo, ChangeEvent} from "react";
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
  handleNameFilter?: (name: string) => void;
  addFilter: (value: string, id: string) => void;
  resetFilter: () => void;
  query: Record<string, string>;
  removeFilter: (filter: string) => void;
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
    return initialData.filter(policy => {
      return Object.keys(query).every(filter => {
        return query[filter] === policy[filter]
      })
    });
  }, [query])


  const handleNameFilter = (name) => {
    const filteredByName = state.policies.filter(policy => {
      return policy.name.toLowerCase().includes(name.toLowerCase())
    })

    if (!name.trim().length) {
      return setState(prev => ({
        ...prev,
        policies: initialData
      }))
    }

    setState(prev => ({
      ...prev,
      policies: filteredByName
    }))
  }

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
    setQuery({})
  }

  const removeFilter = (name: string) => {
    setQuery(prev => {
      const cp = {...prev}
      delete cp[name]

      return cp
    })
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
        handleNameFilter,
        query,
        removeFilter,
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
