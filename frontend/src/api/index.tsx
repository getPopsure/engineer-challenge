import { Filters, PaginationPayload, PolicyResponse } from "../types";

import parsePolicies from "../utils/parsePolicies";

const ROUTES = {
  POLICIES: "policies",
  PROVIDERS: "providers",
}

let headers = new Headers()
headers.append('Accept', '*/*');
headers.append('Access-Control-Allow-Origin', '*');
headers.append('Content-type', 'application/json');

export const getPolicies = async (filters: Filters, pagination: PaginationPayload, search: string = "") => {
  const body = {
    filters,
    pagination,
    search
  }

  const response = await fetch(`http://localhost:4000/${ROUTES.POLICIES}`, {
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

export const getProviders = async () => {
  const response = await fetch(`http://localhost:4000/${ROUTES.PROVIDERS}`, {
    headers
  });
  const providers = await response.json();
  return providers;
}