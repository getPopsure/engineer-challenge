import { useContext } from "react";
import { Context } from "../../context";
import { ReactComponent as CloseIcon } from "../assets/close.svg"

type TFilterBadge = React.HTMLAttributes<HTMLDivElement>;

interface IProps {
  filterKey: string;
  value: string;
}
const FilterBadge: React.FC<IProps & TFilterBadge> = ({ filterKey, value }) => {
  const { removeFilter } = useContext(Context);

  return (
    <div className="bg-primary-100 cursor-pointer py-1 px-2 rounded-md hover:bg-primary-300">
      <span className="uppercase text-sm">{filterKey}:</span>
      <span>{value}</span>
      <button className="ml-2" onClick={() => removeFilter(filterKey, value)}>
        <CloseIcon className="w-2" />
      </button>
    </div>
  )
};


export default FilterBadge;
