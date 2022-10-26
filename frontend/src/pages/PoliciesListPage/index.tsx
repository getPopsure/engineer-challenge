import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import fetchPolicies from "../../api/fetchPolicies";
import Badge from "../../components/Badge";
import ComboBoxMultiple from "../../components/ComboBoxMultiple";
import SearchBox from "../../components/SearchBox";
import Table from "../../components/Table";
import { debounce } from "../../helpers/utils";

const PoliciesListPage = () => {
  const policyStatuses = ["ACTIVE", "PENDING", "CANCELLED", "DROPPED_OUT"];
  const insuranceTypes = ["LIABILITY", "HOUSEHOLD", "HEALTH"];
  const initialPolicyStatusesPrefilter = ["ACTIVE", "PENDING"];
  const [searchText, setSearchText] = useState("");
  const [searchPolicyStatuses, setSearchPolicyStatuses] = useState<string[]>([
    ...initialPolicyStatusesPrefilter,
  ]);
  const [searchInsuranceTypes, setSearchInsuranceTypes] = useState<string[]>(
    []
  );
  const {
    isLoading,
    isError,
    data: policiesData,
  } = useQuery(
    ["fetchPolicies", searchText, searchPolicyStatuses, searchInsuranceTypes],
    () => fetchPolicies(searchText, searchPolicyStatuses, searchInsuranceTypes)
  );
  const tableColumns: TableColumn[] = [
    {
      title: "Name",
      customRow: (row: Policy) => (
        <span>
          {row.customer.firstName} {row.customer.lastName}
        </span>
      ),
    },
    { title: "Provider", accessor: "provider" },
    { title: "Type", accessor: "insuranceType" },
    {
      title: "Status",
      customRow: (row: Policy) => (
        <span>
          <Badge status={row.status} />
        </span>
      ),
    },
  ];

  const handleOnChangeSearchText = debounce((search: string) => {
    setSearchText(search);
  }, 150);

  const clearFilters = () => {
    setSearchText("");
    setSearchInsuranceTypes([]);
    setSearchPolicyStatuses([...initialPolicyStatusesPrefilter]);
  };
  return (
    <section>
      <div className="w-8/12 flex flex-row justify-between gap-10">
        <SearchBox
          labelText="Search name or provider"
          placeholderText="Name or provider ..."
          value={searchText}
          onChange={handleOnChangeSearchText}
        ></SearchBox>
        <ComboBoxMultiple
          labelText="Search by insurance"
          placeholderText="Insurance type"
          options={insuranceTypes}
          value={searchInsuranceTypes}
          onChange={setSearchInsuranceTypes}
        />
        <ComboBoxMultiple
          labelText="Search by policy"
          placeholderText="Policy status"
          options={policyStatuses}
          value={searchPolicyStatuses}
          onChange={setSearchPolicyStatuses}
        />
        <div className="flex flex-row items-end	mb-3 xl:w-96">
          <button
            className="ml-8 h-10 whitespace-nowrap inline-flex items-center justify-center px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-600 hover:bg-gray-700"
            onClick={clearFilters}
          >
            Clear filters
          </button>
        </div>
      </div>
      <Table
        columns={tableColumns}
        rows={policiesData || []}
        isLoading={isLoading}
        isError={isError}
      />
    </section>
  );
};

export default PoliciesListPage;
