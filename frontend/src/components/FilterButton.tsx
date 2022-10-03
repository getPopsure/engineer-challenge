import React from "react";

type TFilter = React.HTMLAttributes<HTMLButtonElement>;

interface IProps {
  callback: () => void;
}

const FilterButton: React.FC<TFilter & IProps> = ({ callback }) => (
  <button
    className="border bg-primary-500 font-bold py-3 px-6 rounded-md text-white hover:bg-primary-700"
    onClick={callback}
  >
    Add Filter
  </button>
);

export default React.memo(FilterButton);