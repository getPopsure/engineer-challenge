import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PolicyEntity } from "../types/generated";
import { PaginatedResponse } from "../types/tempTypes";

export const policiesAPI = createApi({
  reducerPath: "policies",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
  tagTypes: ["Policy"],
  endpoints: (build) => ({
    getPolicies: build.query<
      PaginatedResponse<PolicyEntity>,
      {
        pagination: {
          skip: number;
          take: number;
        };
      }
    >({
      query: (params) => ({
        url: "/policies",
        params: {
          skip: params.pagination.skip,
          take: params.pagination.take,
        },
      }),
    }),
  }),
});

export const { useGetPoliciesQuery } = policiesAPI;
