const fetchPolicies = async (
  searchParam: string,
  policyStatuses: string[],
  insuranceTypes: string[]
): Promise<Policy[]> => {
  const queryParams = new URLSearchParams({
    searchText: searchParam,
  });
  policyStatuses.forEach((policyStatus) =>
    queryParams.append("policyStatuses", policyStatus)
  );
  insuranceTypes.forEach((insuranceType) =>
    queryParams.append("insuranceTypes", insuranceType)
  );
  const hasSearchParams =
    searchParam || policyStatuses.length || insuranceTypes.length;
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_BASE_URL || ""}/policies${
      hasSearchParams ? "?" + queryParams : ""
    }`
  );
  const data = await response.json();
  // await new Promise((r) => setTimeout(r, 2000));
  if (response.ok) {
    return data;
  } else {
    var error = new Error(data && data.statusText);
    throw error;
  }
};

export default fetchPolicies;
