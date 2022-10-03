import React from "react";
import Accordion from "./Accordion";
import { InsuranceType } from "../types";
import useOnClickOutside from "../hooks/useOnClickOutside";
import CheckboxList from "./CheckboxList";

type TFilter = React.HTMLAttributes<HTMLDivElement>;

interface IProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
  providers: Set<string>;
}

const Filter: React.FC<TFilter & IProps> = ({ isFilterOpen, setIsFilterOpen, providers }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => { setIsFilterOpen(false) });

  return (
    <>
      {
        isFilterOpen &&
        <div className="bg-white border py-2 rounded-md w-96" ref={ref}>
          <h3 className="px-4 py-1">Filters</h3>
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

export default Filter;