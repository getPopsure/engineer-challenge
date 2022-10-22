import { useQuery } from "@tanstack/react-query";
import fetchPolicies from "../../api/fetchPolicies";
import Table from "../../components/Table";

const PoliciesListPage = () => {
  const { isLoading, isError, data } = useQuery(
    ["fetchPolicies"],
    fetchPolicies
  );
  const tableColumns = ["#", "Name", "Provider", "Type", "Status"];

  return (
    <Table
      columns={tableColumns}
      rows={data || []}
      isLoading={isLoading}
      isError={isError}
    />
  );
};

export default PoliciesListPage;
