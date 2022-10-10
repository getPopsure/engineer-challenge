import Navbar from "./Navbar";
import Header from "./Header";
import Table from "./Table";
import Filters from "./Filters"
import Pagination, { ITEMS_PER_PAGE } from './Pagination';
import '@popsure/dirty-swan/dist/index.css';
import "./index.css";
import { PolicyStatusEnum } from './types'
import usePoliciesQuery from './stores/policies/query'
import { useReducer, useState } from 'react';
import {reducer as policiesReducer, ActionsTypes } from './stores/policies/reducer'

const App = () => {
   const [policiesState, dispatchPolicies] = useReducer(policiesReducer, { allPolicies: [], currentPolicies: []});
   const [paginationOptions, setPaginationOptions] = useState({
    take: ITEMS_PER_PAGE,
    skip: 0
   });
   const query = `search=${PolicyStatusEnum.Active},${PolicyStatusEnum.Pending}`;
   const { policies, isLoading, isError } = usePoliciesQuery(query);

   if (!isLoading && policies && policies.length !== 0 && policiesState.allPolicies.length === 0) {
    dispatchPolicies({type: ActionsTypes.LoadPolicies, payload: policies});
   }

   const filterPolicies = (action:any) => {
    dispatchPolicies(action);
   }
  return (
  <main>
    <Navbar />
    <div className="w-full p-8">
      <Header />

      {isLoading && !policies && <div>loading...</div>}
      {isError && <div>failed to load</div>}

      {!isLoading && !isError &&
        <div>
          <Filters policies={policies} filterPolicies={filterPolicies}/>
          <Table policies={policiesState.currentPolicies.slice(paginationOptions.skip, paginationOptions.take + paginationOptions.skip)}/>
          <Pagination maxPages={Math.floor(policiesState.currentPolicies.length / ITEMS_PER_PAGE)} dispatchGetPage={(opts: any) => {
            setPaginationOptions(opts);
          }}/>
        </div>
      }
    </div>
  </main>
)};


export default App;
