import React from "react";
import slugify from "../utils/slugify";
import Accordion from "./Accordion";
import { InsuranceType } from "../types";
import useOnClickOutside from "../hooks/useOnClickOutside";

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
        <div className="bg-white border pb-4 rounded-md w-96" ref={ref}>
          <h3 className="px-4 pt-4">Filters</h3>
          <Accordion title="Provider">
            <fieldset className="flex flex-col">
              {
                Array.from(providers).map(provider => (
                  <div>
                    <input id={slugify(provider)} type="checkbox" />
                    <label htmlFor={slugify(provider)}>{provider}</label>
                  </div>
                ))
              }
            </fieldset>
          </Accordion>
          <Accordion title="Type">
            <fieldset>
              {
                Object.values(InsuranceType).map(insuranceType => (
                  <>
                    <input id={slugify(insuranceType)} type="checkbox" />
                    <label htmlFor={slugify(insuranceType)}>{insuranceType}</label>
                  </>
                ))
              }
            </fieldset>
          </Accordion>
        </div>
      }
    </>
  )
};

export default Filter;