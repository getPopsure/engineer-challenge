import { Filters, PaginationPayload, PolicyResponse } from "../types";

import parsePolicies from "../utils/parsePolicies";

export const getPolicies = async (filters: Filters, pagination: PaginationPayload) => {
  let headers = new Headers()
  headers.append('Accept', '*/*');
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Content-type', 'application/json');

  const body = {
    filters,
    pagination
  }

  const response = await fetch('http://localhost:4000/policies', {
    method: "POST",
    body: JSON.stringify(body),
    headers
  });
  const { policiesCount, policies } = await response.json();

  return {
    count: policiesCount,
    policies: parsePolicies(policies as PolicyResponse[])
  }
}