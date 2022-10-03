import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Table from "./components/Table";

import "./styles/index.css";
import Filter from "./components/Filter";
import { useState, useMemo, useEffect } from "react";
import { getPolicies } from "./api";
import { Policy } from "./types";
import FilterButton from "./components/FilterButton";

const App = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(true);
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
        <div className="border flex items-center justify-between relative">
          <Header />
          <FilterButton callback={() => setIsFilterOpen(isOpen => !isOpen)} />
          <div className="absolute right-0 top-full">
            <Filter isFilterOpen={isFilterOpen} providers={providers} />
          </div>
        </div>
        <Table policies={policies} />
      </div>
    </div>
  )
};


export default App;
