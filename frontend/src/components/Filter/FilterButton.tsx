import React, { useContext } from "react";
import { Context } from "../../context";

type TFilter = React.HTMLAttributes<HTMLButtonElement>;

const FilterButton: React.FC<TFilter> = () => {
  const { toggleFilter } = useContext(Context);

  return (
    <button
      className="border bg-primary-500 font-bold py-3 px-6 rounded-md text-white hover:bg-primary-700"
      onClick={toggleFilter}
    >
      Add Filter
    </button>
  )
};

export default React.memo(FilterButton);