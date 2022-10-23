import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import fetchPolicies from "../../api/fetchPolicies";
import SearchBox from "../../components/SearchBox";
import Table from "../../components/Table";
const PoliciesListPage = () => {
  const [searchText, setSearchText] = useState("");

  const {
    isLoading,
    isError,
    data: policiesData,
  } = useQuery(["fetchPolicies", searchText], () => fetchPolicies(searchText));
  const tableColumns = ["#", "Name", "Provider", "Type", "Status"];

  const onSearchSubmit = (search: string) => {
    setSearchText(search);
  };

  return (
    <>
      <SearchBox onSearchSubmit={onSearchSubmit} />
      <Table
        columns={tableColumns}
        rows={policiesData || []}
        isLoading={isLoading}
        isError={isError}
      />
    </>
  );
};

export default PoliciesListPage;
