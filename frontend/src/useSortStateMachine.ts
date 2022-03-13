import React from "react";

export type SortMachineState = {
  column: string | null;
  direction: "ASCENDING" | "DESCENDING";
};

type SortMachineAction = {
  type: "toggle-next-column-state";
  column: string;
};

function sortReducer(
  state: SortMachineState,
  action: SortMachineAction
): SortMachineState {
  if (action.column !== state.column) {
    return {
      column: action.column,
      direction: "ASCENDING",
    };
  } else if (state.direction === "ASCENDING") {
    return {
      ...state,
      direction: "DESCENDING",
    };
  } else if (state.direction === "DESCENDING") {
    return {
      column: "createdAt",
      direction: "DESCENDING",
    };
  }

  return state;
}

export function useSortStateMachine(): [
  SortMachineState,
  (column: string) => () => void,
  (column: string) => string
] {
  const [state, dispatch] = React.useReducer(sortReducer, {
    column: "createdAt",
    direction: "DESCENDING",
  });

  const toggleColumn = React.useCallback(
    (column: string) => () =>
      dispatch({ type: "toggle-next-column-state", column }),
    []
  );

  const getSortingIndicator = React.useCallback(
    (column: string) => {
      if (state.column === column) {
        if (state.direction === "ASCENDING") {
          return "↑";
        } else if (state.direction === "DESCENDING") {
          return "↓";
        }
      }

      return "";
    },
    [state.column, state.direction]
  );

  return [state, toggleColumn, getSortingIndicator];
}
