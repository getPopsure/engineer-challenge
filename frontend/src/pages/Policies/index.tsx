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
  const [isClearVisible, setIsClearVisible] = useState(false);

  const fetchPolicies = useCallback(async (params = {}) => {
    // TODO: check pagination
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
    if (searchValue) {
      await fetchPolicies({ search: searchValue });
      setIsClearVisible(true);
    } else {
      await fetchPolicies();
      setIsClearVisible(false);
    }
  };

  const handleSearchClear = async () => {
    setValue("");
    await fetchPolicies();
    setIsClearVisible(false);
  };

  return (
    <div className="w-full p-8">
      <Header />
      {loading ? (
        <>loading...</>
      ) : (
        <>
          <Search
            value={searchValue}
            onChange={handleSearchChange}
            onSearch={handleSearchSubmit}
          />
          <button onClick={handleSearchClear} disabled={!isClearVisible}>
            Clear
          </button>
          <Table rowData={rowData} />
        </>
      )}
    </div>
  );
};

export default Policies;
