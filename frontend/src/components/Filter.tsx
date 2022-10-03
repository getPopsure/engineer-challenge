import React, { useContext } from "react";
import Accordion from "./Accordion";
import { InsuranceType } from "../types";
import useOnClickOutside from "../hooks/useOnClickOutside";
import CheckboxList from "./CheckboxList";
import { Context } from "../context";

type TFilter = React.HTMLAttributes<HTMLDivElement>;

interface IProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
  providers: Set<string>;
}

const Filter: React.FC<TFilter & IProps> = ({ isFilterOpen, setIsFilterOpen, providers }) => {
  const { filtersCount, clearAllFilters } = useContext(Context);
  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => { setIsFilterOpen(false) });

  return (
    <>
      {
        isFilterOpen &&
        <div className="bg-white border py-2 rounded-md w-96" ref={ref}>
          <div className="flex items-center justify-between px-4 -y-1">
            <h3 className="font-bold py-3">Filters</h3>
            {filtersCount > 0 &&
              <button className="text-primary-500 font-bold hover:bg-primary-100 py-3 px-6 rounded-md" onClick={() => clearAllFilters()}>Clear all</button>
            }

          </div>
          <Accordion title="Provider">
            <CheckboxList filterKey="provider" values={Array.from(providers)} />
          </Accordion>
          <Accordion title="Type">
            <CheckboxList filterKey="type" values={Array.from(Object.values(InsuranceType))} />
          </Accordion>
        </div>
      }
    </>
  )
};

export default React.memo(Filter);