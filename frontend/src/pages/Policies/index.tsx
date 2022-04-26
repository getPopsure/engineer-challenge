import { useCallback, useEffect, useState } from "react";
import axios from "../../axiosConfig";
import Header from "./Header";
import Pagination from "./Pagination";
import Search from "./Search";
import Table from "./Table";

const STATUS_TO_DISPLAY = ["ACTIVE", "PENDING"];

const Policies = () => {
  const [rowData, setRowData] = useState<Policy[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);
  const [page, setPage] = useState(1);

  const fetchPolicies = async (params: {}) => {
    let data: Policy[] = [];
    try {
      // TODO: get page param from state
      const response = await axios.get("/policies", { params: { page: 2 } });
      data = response.data;
    } catch (err: any) {
      setError(true);
    }
    return data;
  };

  const handleDataToDisplay = (data: Policy[]) => {
    const dataToDisplay = data.filter((item: Policy) =>
      STATUS_TO_DISPLAY.includes(item.status)
    );
    setRowData(dataToDisplay);
  };

  const getTableData = useCallback(async (params = {}) => {
    setLoading(true);
    const data = await fetchPolicies(params);
    handleDataToDisplay(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    getTableData();
  }, [getTableData]);

  return (
    <div className="w-full p-8">
      <Header />
      <Search onSearch={getTableData} onClear={getTableData} />
      <Table rowData={rowData} isLoading={isLoading} hasError={hasError} />
      <Pagination page={page} onPageClick={setPage} />
    </div>
  );
};

export default Policies;
