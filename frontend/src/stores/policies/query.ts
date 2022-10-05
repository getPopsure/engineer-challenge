import useSWR from 'swr';
import { Policy } from '../../types'
const queryFetcher = async (url: string) => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw Error(response.statusText);
    }

    return await response.json();
};

export default function usePoliciesQuery(query? :string) {
  const baseUrl = 'http://localhost:4000/policies';
  const url = query !== '' ? `${baseUrl}?${query}` : baseUrl;
  const {data, error} = useSWR( url, queryFetcher);

  return {
    policies: data as Array<Policy>,
    isLoading: !error && !data,
    isError: error
  }
}