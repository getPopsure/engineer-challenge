import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { policiesAPI } from "../services/policies.service";

// Slices
import policiesViewReducer from "../pages/Policies/components/policiesSlice";

export const store = configureStore({
  reducer: {
    [policiesAPI.reducerPath]: policiesAPI.reducer,
    policiesView: policiesViewReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(policiesAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
