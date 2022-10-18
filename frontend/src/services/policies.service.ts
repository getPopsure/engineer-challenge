import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Policy } from "../types/tempTypes";

export const policiesAPI = createApi({
  reducerPath: "policies",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
  tagTypes: ["Policy"],
  endpoints: (build) => ({
    getPolicies: build.query<Policy[], void>({
      query: () => ({
        url: "/policies",
      }),
    }),
  }),
});

export const { useGetPoliciesQuery } = policiesAPI;
