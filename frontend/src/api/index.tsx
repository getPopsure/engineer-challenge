import { Filters } from "../types";

import parsePolicies from "../utils/parsePolicies";

export const getPolicies = async (filters: Filters) => {
  let headers = new Headers()
  headers.append('Accept', '*/*');
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Content-type', 'application/json');

  const response = await fetch('http://localhost:4000/policies', {
    method: "POST",
    body: JSON.stringify(filters),
    headers
  });
  const data = await response.json();
  return parsePolicies(data);
}