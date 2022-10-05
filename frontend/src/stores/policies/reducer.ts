
import { Policy } from '../../types'
import filter from '../../lib/filter'
export enum ActionsTypes {
  LoadPolicies = 'loadPolicies',
  ClearFilter = 'clear',
  FilterByStatus = 'filterByStatus',
  FilterByType = 'filterByType',
  FilterByProvider = 'filterByProvider',
  FilterByName = 'filterByName',
}
interface Action {
  type: ActionsTypes;
  payload: any //Array<Policy> | {name: string, value: string};
}

interface State {
  allPolicies: Array<Policy>,
  currentPolicies: Array<Policy>
}

export const reducer = (state: State, action: Action) => {
  let newState: State = {
    allPolicies: state.allPolicies.concat([]),
    currentPolicies: []
  };
  switch (action.type) {
    case ActionsTypes.LoadPolicies:
      newState = {
        allPolicies: newState.allPolicies.concat(action.payload),
        currentPolicies: newState.currentPolicies.concat(action.payload)
      };
      return newState;

    case ActionsTypes.FilterByStatus:
      newState.currentPolicies = filter(state.allPolicies, (policy:Policy) => policy.status === action.payload)
      return newState;

    case ActionsTypes.FilterByType:
      newState.currentPolicies =filter(state.allPolicies, (policy:Policy) => policy.insuranceType === action.payload)
      return newState;
      case ActionsTypes.FilterByProvider:
      newState.currentPolicies = filter(state.allPolicies, (policy:Policy) => policy.provider === action.payload)
      return newState;
    case ActionsTypes.FilterByName:
        newState.currentPolicies = filter(state.allPolicies, (policy:Policy) => `${policy.customer.firstName.toLowerCase()} ${policy.customer.lastName.toLowerCase()}`.includes(action.payload.toLowerCase()))
        return newState;
    case ActionsTypes.ClearFilter:
      newState.currentPolicies =  newState.allPolicies.concat([]);
      return newState;
    default:
      throw new Error(`[Reducer Error]: policiesReducer needs an action.`);
  }
}
