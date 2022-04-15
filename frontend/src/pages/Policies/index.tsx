import { useCallback, useEffect, useState, ChangeEvent } from "react";
import axios from "../../axiosConfig";
import Header from "./Header";
import Table from "./Table";
import Search from "./Search";
import Spinner from "../../shared/Spinner";

const STATUS_TO_DISPLAY = ["ACTIVE", "PENDING"];

const Policies = () => {
  const [rowData, setRowData] = useState<Policy[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [search, setSearch] = useState<string>("");

  const fetchPolicies = async (params: {}) => {
    let data: Policy[] = [];
    try {
      setLoading(true);
      const response = await axios.get("/policies", { params });
      data = response.data;
    } catch {
      window.alert("Oops! Something went wrong.");
    } finally {
      setLoading(false);
    }
    return data;
  };

  const handleDataToDisplay = (data: Policy[]) => {
    const dataToDisplay = data.filter((item: Policy) =>
      STATUS_TO_DISPLAY.includes(item.status)
    );
    setRowData(dataToDisplay); // TODO: add cleanup to cancel setState
  };

  const getTableData = useCallback(async (params = {}) => {
    const data = await fetchPolicies(params);
    handleDataToDisplay(data);
  }, []);

  useEffect(() => {
    getTableData();
  }, [getTableData]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const handleSearchSubmit = async () => {
    getTableData({ search });
  };

  const handleSearchClear = async () => {
    setSearch("");
    getTableData();
  };

  return (
    <div className="w-full p-8">
      <Header />
      <Search
        value={search}
        onChange={handleSearchChange}
        onSearch={handleSearchSubmit}
        onSearchClear={handleSearchClear}
      />
      {isLoading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <Table rowData={rowData} />
      )}
    </div>
  );
};

export default Policies;
