import { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import Search from "./Search";
import Table from "./Table";

const BASE_URL = "http://localhost:4000";
const STATUS_TO_DISPLAY = ["ACTIVE", "PENDING"];

const Policies = () => {
  const [rowData, setRowData] = useState<Policy[]>([]);

  const fetchPolicies = useCallback((search: string) => {
    // TODO: check pagination
    fetch(`${BASE_URL}/policies?search=${search}`).then((response) =>
      response.json().then((data) => handleDataToDisplay(data))
    );
  }, []);

  const handleDataToDisplay = (data: Policy[]) => {
    // TODO: this should ideally be done with api param
    const dataToDisplay = data.filter((item: Policy) =>
      STATUS_TO_DISPLAY.includes(item.status)
    );
    setRowData(dataToDisplay);
  };

  useEffect(() => {
    fetchPolicies("");
  }, [fetchPolicies]);

  const handleSearch = (value: string) => {
    fetchPolicies(value);
  };

  return (
    <div className="w-full p-8">
      <Header />
      <Search onSearch={handleSearch} />
      <Table rowData={rowData} />
    </div>
  );
};

export default Policies;
