import { createSlice } from "@reduxjs/toolkit";
import { PolicyEntityInsuranceTypeEnum } from "~/src/types/generated";

export interface PoliciesState {
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  filters: {
    insuranceType: PolicyEntityInsuranceTypeEnum[];
  };
}

const initialState: PoliciesState = {
  pagination: {
    pageIndex: 0,
    pageSize: 8,
  },
  filters: {
    insuranceType: [],
  },
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
    setInsuranceType: (state, action) => {
      state.filters.insuranceType = action.payload;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const { setTablePagination, setInsuranceType, clearFilters } =
  policiesSlice.actions;

export default policiesSlice.reducer;
