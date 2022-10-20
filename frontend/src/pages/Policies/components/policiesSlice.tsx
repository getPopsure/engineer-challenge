import { createSlice } from "@reduxjs/toolkit";
import {
  PolicyEntityInsuranceTypeEnum,
  PolicyEntityStatusEnum,
} from "~/src/types/generated";

export interface PoliciesState {
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  filters: {
    insuranceType: PolicyEntityInsuranceTypeEnum[];
    insuranceStatus: PolicyEntityStatusEnum[];
  };
  search: {
    provider?: string;
    customerName?: string;
    customerRelatives?: string;
  };
}

const initialState: PoliciesState = {
  pagination: {
    pageIndex: 0,
    pageSize: 10,
  },
  filters: {
    insuranceType: [],
    insuranceStatus: [],
  },
  search: {},
};

export const policiesSlice = createSlice({
  name: "appView",
  initialState,
  reducers: {
    setTablePagination: (
      state,
      action: {
        payload: {
          pageIndex: number;
          pageSize: number;
        };
      }
    ) => {
      state.pagination = action.payload;
    },
    // Can be also a single action with an additional parameter
    setSearchProvider: (state, action) => {
      state.search.provider = action.payload;
    },
    setSearchCustomerName: (state, action) => {
      state.search.customerName = action.payload;
    },
    setSearchCustomerRelatives: (state, action) => {
      state.search.customerRelatives = action.payload;
    },
    setInsuranceType: (state, action) => {
      state.filters.insuranceType = action.payload;
    },
    setInsuranceStatus: (state, action) => {
      state.filters.insuranceStatus = action.payload;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.search = initialState.search;
    },
  },
});

export const {
  setTablePagination,
  setInsuranceType,
  setInsuranceStatus,
  setSearchProvider,
  setSearchCustomerName,
  setSearchCustomerRelatives,
  clearFilters,
} = policiesSlice.actions;

export default policiesSlice.reducer;
