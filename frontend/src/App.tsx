import Navbar from "./Navbar";
import Header from "./Header";
import Table from "./Table";
import Filters from "./Filters"
import '@popsure/dirty-swan/dist/index.css';
import "./index.css";
import { PolicyStatusEnum } from './types'
import usePoliciesQuery from './stores/policies/query'
import { useReducer } from 'react';
import {reducer as policiesReducer, ActionsTypes } from './stores/policies/reducer'



const App = () => {   
   const [policiesState, dispatchPolicies] = useReducer(policiesReducer, { allPolicies: [], currentPolicies: []});
   const query = `search=${PolicyStatusEnum.Active},${PolicyStatusEnum.Pending}`;
   const { policies, isLoading, isError } = usePoliciesQuery(query);

   if (!isLoading && policies && policies.length !== 0 && policiesState.allPolicies.length === 0) {
    dispatchPolicies({type: ActionsTypes.LoadPolicies, payload: policies})
   }

   
  return (
  <div>
    <Navbar />
    <div className="w-full p-8">
      <Header />

      {isLoading && !policies && <div>loading...</div>}
      {isError && <div>failed to load</div>}

      {!isLoading && !isError &&
        <div>
          <Filters policies={policies} dispatchPolicies={dispatchPolicies}/>
          <Table policies={policiesState.currentPolicies}/>
        </div>
      }
    </div>
  </div>
)};


export default App;
