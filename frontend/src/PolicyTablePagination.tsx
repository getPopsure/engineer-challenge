import React from "react";
import {
  ApolloQueryResult,
  FetchMoreOptions,
  FetchMoreQueryOptions,
} from "@apollo/client";
import type { QueryArgsOptions, QueryResultOptions } from "./PolicyTable";

export type PageInfo = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  currentPage: number;
  totalPages: number;
};

export type PolicyTablePaginationProps = {
  fetchMore: (
    options: FetchMoreQueryOptions<QueryArgsOptions, QueryResultOptions> &
      FetchMoreOptions<QueryResultOptions, QueryArgsOptions>
  ) => Promise<ApolloQueryResult<QueryResultOptions>>;
  currentPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  paginationLimit: number;
};

export default React.memo(function PolicyTablePagination({
  currentPage,
  hasNextPage,
  hasPreviousPage,
  fetchMore,
  paginationLimit,
}: PolicyTablePaginationProps) {
  const fetchNextPage = React.useCallback(async () => {
    await fetchMore({
      variables: {
        pagination: {
          page: currentPage + 1,
          perPage: paginationLimit,
        },
      },
      updateQuery: (_, { fetchMoreResult }) => {
        return fetchMoreResult!;
      },
    });
  }, [fetchMore, currentPage, paginationLimit]);

  const fetchPreviousPage = React.useCallback(async () => {
    await fetchMore({
      variables: {
        pagination: {
          page: currentPage - 1,
          perPage: paginationLimit,
        },
      },
      updateQuery: (_, { fetchMoreResult }) => {
        return fetchMoreResult!;
      },
    });
  }, [fetchMore, currentPage, paginationLimit]);

  return (
    <div className="py-5 flex justify-between">
      {hasPreviousPage ? (
        <button
          className="py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          onClick={fetchPreviousPage}
        >
          ← &nbsp; Previous
        </button>
      ) : (
        <div />
      )}

      {hasNextPage ? (
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
  );
});
