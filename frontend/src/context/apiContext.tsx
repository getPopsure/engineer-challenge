import React, {useContext, useState, useEffect, createContext, useMemo } from "react";
import { TPolicy, TProviders, TStatus, TTypes } from "../types";
import { serializePolicies } from "../serializer";

const POLICIES = 'policies'

type TPolicies = {
  policies: TPolicy[];
  providers: TProviders[];
  type: TTypes[];
  status: TStatus[];
}

type ContextProps = {
  state: TPolicies;
  handleNameFilter: (name: string) => void;
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
export const AppContext = createContext<ContextProps | null>(null);

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
    const filteredPoliciesByStatus: TPolicy[] = policies.filter(policy => policy.status === "ACTIVE" || policy.status === "PENDING")

    const appState = {
      policies: filteredPoliciesByStatus,
      providers: [...new Set(filteredPoliciesByStatus.map(policy => policy.provider))] as TProviders[],
      type: [...new Set(filteredPoliciesByStatus.map(policy => policy.type))] as TTypes[],
      status: [...new Set(filteredPoliciesByStatus.map(policy => policy.status))] as TStatus[]
    }

    setState(appState)
    setInitialData(filteredPoliciesByStatus)
  }

  useEffect(() => {
    (async () => {
      try {
        let response = await fetch(`http://localhost:4000/${POLICIES}`)

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
