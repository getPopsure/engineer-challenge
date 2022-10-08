import { Filters, PaginationPayload, PolicyResponse } from "../types";

import parsePolicies from "../utils/parsePolicies";

export const getPolicies = async (filters: Filters, pagination: PaginationPayload, search: string = "") => {
  let headers = new Headers()
  headers.append('Accept', '*/*');
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Content-type', 'application/json');

  const body = {
    filters,
    pagination,
    search
  }

  const response = await fetch('http://localhost:4000/policies', {
    method: "POST",
    body: JSON.stringify(body),
    headers
  });
  const { count, policies } = await response.json();


  return {
    count,
    policies: parsePolicies(policies as PolicyResponse[])
  }
}