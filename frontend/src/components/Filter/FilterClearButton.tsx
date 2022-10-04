import React, { useContext } from "react";

import { Context } from "../../context";

type TFilterClearButton = React.HTMLAttributes<HTMLButtonElement>;

const FilterClearButton: React.FC<TFilterClearButton> = () => {
  const { clearAllFilters } = useContext(Context);

  return (
    <button
      className="text-primary-500 rounded-md text-sm hover:text-primary-700 "
      onClick={() => clearAllFilters()}
    >
      Clear all
    </button>
  )
};

export default React.memo(FilterClearButton);