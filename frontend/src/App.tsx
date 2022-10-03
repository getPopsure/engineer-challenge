import { useState, useMemo, useEffect } from "react";

import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Table from "./components/Table";
import FilterSelection from "./components/Filter/FilterSelection";
import FilterList from "./components/Filter/FilterList";

import { getPolicies } from "./api";
import { Policy } from "./types";

import "./styles/index.css";

const App = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const providers = useMemo(() => {
    return new Set(policies.map(policy => policy.provider))
  }, [policies]);

  useEffect(() => {
    const response = getPolicies();
    setPolicies(response as Policy[]);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="w-full p-8">
        <div className="relative">
          <Header />
          <div className="absolute right-0 top-full">
            <FilterSelection providers={providers} />
          </div>
        </div>
        <FilterList />
        <Table policies={policies} />
      </div>
    </div>
  )
};


export default App;
