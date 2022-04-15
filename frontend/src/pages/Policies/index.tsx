import { useCallback, useEffect, useState, ChangeEvent } from "react";
import axios from "../../axiosConfig";
import Header from "./Header";
import Table from "./Table";
import Search from "./Search";

const STATUS_TO_DISPLAY = ["ACTIVE", "PENDING"];

const Policies = () => {
  const [rowData, setRowData] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setValue] = useState<string>("");

  const fetchPolicies = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      const response = await axios.get("/policies", { params });
      handleDataToDisplay(response.data);
    } catch {
      window.alert("something went wrong!");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDataToDisplay = (data: Policy[]) => {
    // TODO: this should ideally be done with api param
    const dataToDisplay = data.filter((item: Policy) =>
      STATUS_TO_DISPLAY.includes(item.status)
    );
    setRowData(dataToDisplay); // TODO: add cleanup to cancel setState
  };

  useEffect(() => {
    const getData = async () => {
      await fetchPolicies();
    };
    getData();
  }, [fetchPolicies]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const handleSearchSubmit = async () => {
    await fetchPolicies({ search: searchValue });
  };

  const handleSearchClear = async () => {
    setValue("");
    await fetchPolicies();
  };

  return (
    <div className="w-full p-8">
      <Header />
      {loading ? (
        <>loading...</>
      ) : (
        <>
          {/* TODO: responsive */}
          <Search
            value={searchValue}
            onChange={handleSearchChange}
            onSearch={handleSearchSubmit}
            onSearchClear={handleSearchClear}
          />
          <Table rowData={rowData} />
        </>
      )}
    </div>
  );
};

export default Policies;
