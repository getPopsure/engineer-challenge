import React from "react";
import { gql, useQuery } from "@apollo/client";
import {
  type SortMachineState,
  useSortStateMachine,
} from "./useSortStateMachine";
import PolicyTablePagination, { type PageInfo } from "./PolicyTablePagination";
import type { Policy } from "./PolicyTableRow";
import PolicyTableRow from "./PolicyTableRow";

export const POLICY_TABLE_QUERY = gql`
  query policiesTable(
    $sortBy: PoliciesSorting
    $pagination: Pagination
    $filter: PoliciesFilter
  ) {
    paginatedPolicies(
      sortBy: $sortBy
      pagination: $pagination
      filter: $filter
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        totalPages
        currentPage
      }
      policies {
        policyId
        provider
        policyNumber
        startDate
        endDate
        insuranceType
        status
        customer {
          customerId
          firstName
          lastName
        }
      }
    }
  }
`;

export type QueryResultOptions = {
  paginatedPolicies?: {
    policies: Policy[];
    pageInfo: PageInfo;
  };
};

export type QueryArgsOptions = {
  sortBy?: SortMachineState;
  pagination?: {
    page: number;
    perPage: number;
  };
  filter?: {
    textFilter: string;
    insuranceTypeFilter: string[];
  };
};

export type PolicyTableProps = {
  paginationLimit?: number;
  textFilter: string;
  insuranceTypeFilter: string[];
};

export default React.memo(function PolicyTable({
  paginationLimit = 33,
  textFilter,
  insuranceTypeFilter,
}: PolicyTableProps) {
  const [sortState, toggleColumnSort, getSortingIndicator] =
    useSortStateMachine();

  const { fetchMore, error, data } = useQuery<
    QueryResultOptions,
    QueryArgsOptions
  >(POLICY_TABLE_QUERY, {
    variables: {
      sortBy: {
        column: sortState.column,
        direction: sortState.direction,
      },
      pagination: {
        page: 0,
        perPage: paginationLimit,
      },
      filter: {
        textFilter,
        insuranceTypeFilter,
      },
    },
  });

  const policies = data?.paginatedPolicies?.policies;
  const pageInfo = data?.paginatedPolicies?.pageInfo;

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <>
      <div className="overflow-hidden shadow-md rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th
                scope="col"
                className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase cursor-pointer"
                onClick={toggleColumnSort("name")}
              >
                Customer Name &nbsp; {getSortingIndicator("name")}
              </th>
              <th
                scope="col"
                className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase cursor-pointer"
                onClick={toggleColumnSort("provider")}
              >
                Provider (editable) &nbsp; {getSortingIndicator("provider")}
              </th>
              <th
                scope="col"
                className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase cursor-pointer"
                onClick={toggleColumnSort("policyNumber")}
              >
                Policy Number &nbsp; {getSortingIndicator("policyNumber")}
              </th>
              <th
                scope="col"
                className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase cursor-pointer"
                onClick={toggleColumnSort("startDate")}
              >
                Coverage Period (editable) &nbsp;
                {getSortingIndicator("startDate")}
              </th>
              <th
                scope="col"
                className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase cursor-pointer"
                onClick={toggleColumnSort("insuranceType")}
              >
                Insurance Type &nbsp;
                {getSortingIndicator("insuranceType")}
              </th>
              <th
                scope="col"
                className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase cursor-pointer"
                onClick={toggleColumnSort("status")}
              >
                Status &nbsp;
                {getSortingIndicator("status")}
              </th>
              <th scope="col" className="relative py-3 px-6">
                <span className="sr-only">Show</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {policies?.length === 0 ? (
              <tr className="border-b">
                <td colSpan={7}>
                  <div className="py-2 text-center text-large font-semibold">
                    No policies found
                  </div>
                </td>
              </tr>
            ) : (
              policies?.map((policy: Policy) => (
                <PolicyTableRow key={policy.policyId} policy={policy} />
              ))
            )}
          </tbody>
        </table>
      </div>

      <PolicyTablePagination
        currentPage={pageInfo?.currentPage || 0}
        hasNextPage={!!pageInfo?.hasNextPage}
        hasPreviousPage={!!pageInfo?.hasPreviousPage}
        fetchMore={fetchMore}
        paginationLimit={paginationLimit}
      />
    </>
  );
});
