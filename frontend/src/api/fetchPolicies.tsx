const fetchPolicies = async (searchParam: string): Promise<Policy[]> => {
  const queryParams = new URLSearchParams({ search: searchParam });
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_BASE_URL}/policies?${queryParams}`
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
