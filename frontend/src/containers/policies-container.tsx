import { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import {
  filterAtom,
  FilterType,
  paginationAtom,
  PaginationType
} from "../atoms";
import { Pager } from "../components/pager";
import { Table } from "../components/table";
import { Policy } from "../models/Policy";
import { TableColumn, TableRecord } from "../models/Table";

const PoliciesContainer = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [filterState, setFilterState] = useRecoilState<FilterType>(filterAtom);
  const [pagerState, setPagerState] =
    useRecoilState<PaginationType>(paginationAtom);

  const columns = useRef<TableColumn[]>([
    {
      name: "#",
    },
    {
      name: "Name",
      type: "text",
    },
    {
      name: "Provider",
      type: "text",
    },
    {
      name: "Type",
      type: "select",
      selectOptions: ["LIABILITY", "HOUSEHOLD", "HEALTH"],
      selected: [],
    },
    {
      name: "Status",
      type: "select",
      selectOptions: ["ACTIVE", "PENDING", "CANCELLED", "DROPPED_OUT"],
      selected: filterState.Status,
    },
  ]);

  useEffect(() => {
    const fetchPolicies = async () => {
      const response = await fetch("http://localhost:4000/policies");
      const data = await response.json();
      setPolicies(data);
    };

    fetchPolicies();
  }, []);

  const filteredPolicies = useMemo(() => {
    return policies.filter((policy) => {
      let insuranceTypeMatches = true;
      let policyMatches = true;
      let nameMatches = true;
      let providerMatches = true;

      const {
        insuranceType,
        status,
        customer: { firstName, lastName },
        provider,
      } = policy;

      const customerName = firstName + " " + lastName;

      if (filterState.Type.length > 0) {
        insuranceTypeMatches = filterState.Type.includes(insuranceType);
      }

      if (filterState.Status.length > 0) {
        policyMatches = filterState.Status.includes(status);
      }

      if (filterState.Name && customerName) {
        nameMatches = !!customerName.match(new RegExp(filterState.Name, "ig"))
          ?.length;
      }

      if (filterState.Provider) {
        providerMatches = !!provider.match(
          new RegExp(filterState.Provider, "ig")
        )?.length;
      }

      return (
        insuranceTypeMatches && policyMatches && nameMatches && providerMatches
      );
    });
  }, [policies, filterState]);

  const tableData = useMemo<TableRecord[]>(() => {
    const { recordsPerPage, activePage } = pagerState;

    const endIndex = recordsPerPage * activePage;
    const startIndex = endIndex - recordsPerPage;

    return filteredPolicies
      .map((policy, index) => ({
        id: policy.id,
        cells: [
          { name: "#", value: index + 1 + "" },
          {
            name: "Name",
            value: policy.customer.firstName + " " + policy.customer.lastName,
          },
          { name: "Provider", value: policy.provider },
          { name: "Type", value: policy.insuranceType },
          { name: "Status", value: policy.status },
        ],
      }))
      .slice(startIndex, endIndex);
  }, [filteredPolicies.length, pagerState.activePage]);

  const handleFilterChange = (name: string, values: string[] | string) => {
    setPagerState((prev) => ({ ...prev, activePage: 1 }));
    setFilterState((prev) => ({ ...prev, [name]: values }));
  };

  useEffect(() => {
    const policies = filteredPolicies;
    if (policies.length) {
      const { recordsPerPage } = pagerState;
      const totalPages = Math.ceil(policies.length / recordsPerPage);

      setPagerState((prev) => ({
        ...prev,
        totalPages,
        totalRecords: policies.length,
      }));
    }
  }, [filteredPolicies.length, pagerState.recordsPerPage]);

  const handlePageChange = (page: number) => {
    setPagerState((prev) => ({
      ...prev,
      activePage: page,
    }));
  };

  return (
    <>
      <Table
        records={tableData}
        columns={columns.current}
        onFilterChange={handleFilterChange}
        filterState={filterState}
      />
      <div className={"pager-wrapper"}>
        <Pager
          totalPages={pagerState.totalPages}
          onPageChange={handlePageChange}
          activePage={pagerState.activePage}
        />
      </div>
    </>
  );
};

export { PoliciesContainer };

