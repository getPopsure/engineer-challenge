import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Search from "./Search";
import Table from "./Table";

const BASE_URL = "http://localhost:4000";
const STATUS_TO_DISPLAY = ["ACTIVE", "PENDING"];

const Policies = () => {
  const [rowData, setRowData] = useState<Policy[]>([]);

  const fetchPolicies = useCallback(async (params = {}) => {
    // TODO: check pagination
    try {
      const response = await axios.get(`${BASE_URL}/policies`, { params });
      handleDataToDisplay(response.data);
    } catch {
      window.alert("something went wrong!");
    }
  }, []);

  const handleDataToDisplay = (data: Policy[]) => {
    // TODO: this should ideally be done with api param
    const dataToDisplay = data.filter((item: Policy) =>
      STATUS_TO_DISPLAY.includes(item.status)
    );
    setRowData(dataToDisplay);
  };

  // useEffect(() => {
  //   const getData = async () => {
  //     await fetchPolicies();
  //   };
  //   getData();
  // }, [fetchPolicies]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/policies")
      .then((res) => setRowData(res.data));
  }, []);

  const handleSearch = async (search: string) => {
    await fetchPolicies(search ? { search } : {});
  };

  const handleClear = async () => {
    await fetchPolicies();
  };

  return (
    <div className="w-full p-8">
      <Header />
      <Search onSearch={handleSearch} />
      <button onClick={handleClear}>Clear</button>
      <Table rowData={rowData} />
    </div>
  );
};

export default Policies;
