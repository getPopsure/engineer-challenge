import React, { useContext } from "react";

import { Context } from "../../context";

import { ReactComponent as CloseIcon } from "../../assets/close.svg"

type TFilterBadge = React.HTMLAttributes<HTMLDivElement>;

interface IProps {
  filterKey: string;
  value: string;
}
const FilterChip: React.FC<IProps & TFilterBadge> = ({ filterKey, value }) => {
  const { removeFilter } = useContext(Context);

  return (
    <div className="bg-primary-100 border-2 border-primary-100 flex gap-2 items-center py-1 px-2 rounded-lg text-sm w-fit hover:border-primary-500">
      <span>{value}</span>
      <button
        className="flex h-4 justify-center items-center text-primary-300 w-4"
        onClick={() => removeFilter(filterKey, value)}>
        <CloseIcon className="h-3 w-3" />
      </button>
    </div>
  )
};


export default React.memo(FilterChip);