import { createSlice } from "@reduxjs/toolkit";

export interface PoliciesState {
  filters: {
    status: string;
  };
}

const initialState: PoliciesState = {
  filters: {
    status: "ALL",
  },
};

export const policiesSlice = createSlice({
  name: "appView",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filters = action.payload;
    },
  },
});

export const { setFilter } = policiesSlice.actions;

export default policiesSlice.reducer;
