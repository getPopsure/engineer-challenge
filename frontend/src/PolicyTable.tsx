import React from "react";
import { ApolloError, gql, useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import InsuranceType, { InsuranceTypes } from "./InsuranceType";
import InsuranceStatus, { InsuranceStatuses } from "./InsuranceStatus";
import { EditableCell, TextInputCell, PeriodInputCell } from "./EditableCell";
import { useSortStateMachine } from "./useSortStateMachine";

// This should be generated by gql.schema
// but I don't have time implementing this
type Policy = {
  policyId: string;
  provider: string;
  policyNumber: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  status: InsuranceStatuses;
  insuranceType: InsuranceTypes;
  customer: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
  };
};

const POLICY_TABLE_QUERY = gql`
  query policiesTable($sortBy: PoliciesSorting, $pagination: Pagination) {
    paginatedPolicies(sortBy: $sortBy, pagination: $pagination) {
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

const POLICY_MUTATION = gql`
  mutation UpdatePolicy(
    $policyId: ID!
    $provider: String
    $startDate: String
    $endDate: String
  ) {
    updatePolicy(
      policyId: $policyId
      provider: $provider
      startDate: $startDate
      endDate: $endDate
    ) {
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
`;

function formatDatePeriod([fromString, toString]: string[]) {
  const formatter = new Intl.DateTimeFormat();
  const fromDate = Date.parse(fromString);
  const toDate = Date.parse(toString);

  return `${formatter.format(fromDate)} - ${formatter.format(toDate)}`;
}

export type PolicyTableProps = {
  paginationLimit?: number;
};

export default React.memo(function PolicyTable({
  paginationLimit = 33,
}: PolicyTableProps) {
  const [sortState, toggleColumnSort, getSortingIndicator] =
    useSortStateMachine();

  const { fetchMore, loading, error, data } = useQuery(POLICY_TABLE_QUERY, {
    variables: {
      sortBy: {
        column: sortState.column,
        direction: sortState.direction,
      },
      pagination: {
        page: 0,
        perPage: paginationLimit,
      },
    },
  });

  const [mutatePolicy] = useMutation(POLICY_MUTATION, {
    onCompleted: (data) => {
      // TODO: add toast message about successful operation
    },
    onError: (err: ApolloError) => {
      // TODO: add toast message or indicate about this error somehow
      console.error(err);
    },
  });

  const handleCommitChanges = React.useCallback(
    async <T,>(policyId: string, field: string, newValue: T) => {
      let variables = {};

      if (field === "provider") {
        variables = {
          provider: newValue,
        };
      }

      if (field === "period") {
        const [startDate, endDate] = newValue as unknown as string[];

        variables = {
          startDate,
          endDate,
        };
      }

      await mutatePolicy({
        variables: {
          policyId,
          ...variables,
        },
      });
    },
    [mutatePolicy]
  );

  const policies = data?.paginatedPolicies?.policies;
  const pageInfo = data?.paginatedPolicies?.pageInfo;

  const fetchNextPage = React.useCallback(async () => {
    await fetchMore({
      variables: {
        pagination: {
          page: pageInfo?.currentPage + 1,
          perPage: paginationLimit,
        },
      },
      updateQuery: (_, { fetchMoreResult }) => {
        return fetchMoreResult;
      },
    });
  }, [fetchMore, pageInfo?.currentPage, paginationLimit]);

  const fetchPreviousPage = React.useCallback(async () => {
    await fetchMore({
      variables: {
        pagination: {
          page: pageInfo?.currentPage - 1,
          perPage: paginationLimit,
        },
      },
      updateQuery: (_, { fetchMoreResult }) => {
        return fetchMoreResult;
      },
    });
  }, [fetchMore, pageInfo?.currentPage, paginationLimit]);

  if (error) {
    return <h2>{error}</h2>;
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="overflow-x-auto">
      <div className="block px-6 py-2 min-w-full">
        <div className="py-4">
          <label>
            <span>Search</span>

            <div className="relative mt-1">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5"
                placeholder="Search for items"
              />
            </div>
          </label>
        </div>

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
              {policies.length === 0 && (
                <tr className="border-b">
                  <td colSpan={7}>
                    <div className="py-2 text-center text-large font-semibold">
                      No policies found
                    </div>
                  </td>
                </tr>
              )}
              {policies.length > 0 &&
                policies.map((policy: Policy) => (
                  <tr
                    key={policy.policyId}
                    className="border-b odd:bg-white even:bg-gray-200"
                  >
                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                      {policy.customer.firstName} {policy.customer.lastName}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
                      <EditableCell
                        field="provider"
                        entityId={policy.policyId}
                        value={policy.provider}
                        inputComponent={TextInputCell}
                        onCommitChanges={handleCommitChanges}
                      />
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
                      {policy.policyNumber}
                    </td>
                    <td className="w-72 py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
                      <EditableCell
                        field="period"
                        entityId={policy.policyId}
                        value={[policy.startDate, policy.endDate]}
                        valueFormatter={formatDatePeriod}
                        inputComponent={PeriodInputCell}
                        onCommitChanges={handleCommitChanges}
                      />
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
                      <InsuranceType type={policy.insuranceType} />
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
                      <InsuranceStatus status={policy.status} />
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                      <Link
                        className="text-blue-600 hover:underline"
                        to={`/policy/${policy.policyId}`}
                      >
                        Show
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="py-5 flex justify-between">
          {pageInfo?.hasPreviousPage ? (
            <button
              className="py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              onClick={fetchPreviousPage}
            >
              ← &nbsp; Previous
            </button>
          ) : (
            <div />
          )}
          {pageInfo?.hasNextPage ? (
            <button
              className="py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              onClick={fetchNextPage}
            >
              Next &nbsp; →
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
});
