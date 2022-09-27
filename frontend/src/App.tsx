import Navbar from "./Navbar";
import Header from "./Header";
import Table from "./Table";
import Filters from "./Filters"
import '@popsure/dirty-swan/dist/index.css';
import "./index.css";
import useSWR from 'swr';

import { useState  } from "react";
const queryFetcher = async () => {
  //try {
    const response = await fetch(`http://localhost:4000/policies`, {
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
  // } catch (error) {
    
  //   console.log(error);
  // }
};

export function usePoliciesQuery(endpoint: string) {
  const {data, error} = useSWR(endpoint ? [endpoint] : null, queryFetcher);

  return {
    policies: data,
    isLoading: !error && !data,
    isError: error
  }
}

const App =  () => { 
 // const [policies, setPolicies ] = useState()

   const { policies, isLoading, isError} = usePoliciesQuery('policies');
   if (isError) return <div>failed to load</div>
   if (isLoading) return <div>loading...</div>
  
  return (
  <div>
    <Navbar />
    <div className="w-full p-8">
      <Header />
      <Filters policies={policies}/>
      <Table policies={policies}/>
    </div>
  </div>
)};


export default App;
