import React, { useContext, useState, useEffect, createContext } from "react";

const APIContext = createContext<any>([]);
const POLICIES = 'policies'

type ApiContextProviderProps = {
  children: React.ReactNode
}

export const APIContextProvider: React.FC<ApiContextProviderProps> = ({ children }) => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/${POLICIES}`)

        if (response.ok) {
          let data = await response.json()
          setPolicies(data)
        }
      } catch (e) {
        console.log(e)
      }
    }

    fetchPolicies()
  }, []);

  return (
    <APIContext.Provider
      value={{
        policies
      }}
    >
      {children}
    </APIContext.Provider>
  );
}

export function useAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
