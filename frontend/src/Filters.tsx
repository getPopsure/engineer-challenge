import {Input} from "@popsure/dirty-swan";
import Select from "./Select"

import { Policy, PolicyStatusEnum, InsuranceTypeEnums } from './types'
import { ActionsTypes as PoliciesActionTypes } from './stores/policies/reducer';

interface FilterProps {
  policies: Array<Policy>,
  filterPolicies: Function
}
export default function Filters({policies, filterPolicies}: FilterProps) {
  const statusOptions: Array<{label:string, value:string}> = []

  Object.values(PolicyStatusEnum).forEach(value => statusOptions.push({
    label: value,
    value
  }));

  const typeOptions: Array<{label:string, value:string}> = []
  Object.values(InsuranceTypeEnums).forEach(value => typeOptions.push({
    label: value,
    value
  }));

    const providerOptions: Array<{label:string, value:string}> = [];
    const providers: Array<string> = [];
    policies.forEach((value) => {
      const currentProvider: string = value.provider;

      if(!providers.includes(currentProvider)) {
        providers.push(currentProvider);
        providerOptions.push({
          label: currentProvider,
          value: currentProvider,
        })
      }
  });

  const rudimendaryDebounce  =  function (func: Function, delay: number) {
    let timerId: any;
    clearTimeout(timerId)
    timerId = setTimeout(func, delay)
  }

  return (
    <section>
     <h2 className="p-h2 mt24 mb24">Filters</h2>
     <div className="fd-row ai-center jc-center">
      <Input placeholder="name" name="name" className="mr24 mt24 mb24 w25 d-inline-block" onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
        rudimendaryDebounce(filterPolicies({ type: PoliciesActionTypes.FilterByName, payload: e.target.value}), 1000)
      }}></Input>
      <Select className="mt24 mb24 w25 mr24" name="provider" label="Provider" id="provier" options={providerOptions} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        const action = e.target.value !== '' ? PoliciesActionTypes.FilterByProvider : PoliciesActionTypes.ClearFilter;
        filterPolicies({ type: action, payload: e.target.value})
      }}/>
      <Select className="mt24 mb24 w25 mr24" name="type" label="Type" id="type" options={typeOptions} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        const action = e.target.value !== '' ? PoliciesActionTypes.FilterByType : PoliciesActionTypes.ClearFilter;
        filterPolicies({ type: action, payload: e.target.value})
      }}/>
      <Select className="mt24 mb24 w25 mr24"  name="status" label="Status" id="status" options={statusOptions} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        const action = e.target.value !== '' ? PoliciesActionTypes.FilterByStatus : PoliciesActionTypes.ClearFilter;
        filterPolicies({ type: action, payload: e.target.value})
      }}/>
   
     </div>
     </section>
   )
}
