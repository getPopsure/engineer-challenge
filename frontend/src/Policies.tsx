import { ChangeEvent, useEffect, useState } from "react";
import Header from "./Header";
import Search from "./Search";
import Table from "./Table";

const BASE_URL = "http://localhost:4000";
const STATUS_TO_DISPLAY = ["ACTIVE", "PENDING"];

const Policies = () => {
  const [rowData, setRowData] = useState<Policy[]>([]);
  const [searchString, setSearchString] = useState<string>("");

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = () => {
    // TODO: check pagination
    fetch(`${BASE_URL}/policies?search=${searchString}`).then((response) =>
      response.json().then((data) => handleDataToDisplay(data))
    );
  };

  const handleDataToDisplay = (data: Policy[]) => {
    // TODO: this should ideally be done with api param
    const dataToDisplay = data.filter((item: Policy) =>
      STATUS_TO_DISPLAY.includes(item.status)
    );
    setRowData(dataToDisplay);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  return (
    <div className="w-full p-8">
      <Header />
      <Search onChange={handleSearchChange} onSearch={fetchPolicies} />
      <Table rowData={rowData} />
    </div>
  );
};

export default Policies;
