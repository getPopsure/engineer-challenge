import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PolicyEntity } from "../types/generated";
import {
  PaginatedRequest,
  PaginatedResponse,
  PolicyFilters,
  PolicySearch,
} from "../types/tempTypes";

export const policiesAPI = createApi({
  reducerPath: "policies",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
  tagTypes: ["Policy"],
  endpoints: (build) => ({
    getPolicies: build.query<
      PaginatedResponse<PolicyEntity>,
      PaginatedRequest<PolicyFilters, PolicySearch>
    >({
      query: (params) => ({
        url: "/policies",
        params: {
          skip: params.pagination.skip,
          take: params.pagination.take,
          filterStatus: params.filters.insuranceStatus,
          filterType: params.filters.insuranceType,
          searchCustomerName: params.search?.customerName,
          searchProvider: params.search?.provider,
        },
      }),
    }),
  }),
});

export const { useGetPoliciesQuery } = policiesAPI;
