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
  const [totalPage, setTotalPage] = useState(0);

  const fetchPolicies = useCallback(async (params) => {
    let data: Policy[] = [];
    try {
      const response = await axios.get("/policies", { params });
      const totalPage = response.data.totalPage;
      setTotalPage(totalPage);
      data = response.data.policies;
    } catch (err: any) {
      setError(true);
    }
    return data;
  }, []);

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
    // getTableData();
    const getData = async () => {
      const data = await fetchPolicies({ page });
      handleDataToDisplay(data);
    };
    getData();
  }, [page, fetchPolicies]);

  return (
    <div className="w-full p-8">
      <Header />
      <Search onSearch={getTableData} onClear={getTableData} />
      <Table rowData={rowData} isLoading={isLoading} hasError={hasError} />
      <Pagination onPageClick={setPage} totalPage={totalPage} />
    </div>
  );
};

export default Policies;
