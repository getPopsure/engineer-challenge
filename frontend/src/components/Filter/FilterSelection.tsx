import React, { useContext, useMemo } from "react";

import Accordion from "../Accordion";
import CheckboxList from "../CheckboxList";
import FilterClearButton from "./FilterClearButton";

import { Context } from "../../context";
import useOnClickOutside from "../../hooks/useOnClickOutside";

import { InsuranceType, Policy, Status } from "../../types";

type TFilter = React.HTMLAttributes<HTMLDivElement>;

const Filter: React.FC<TFilter> = () => {
  const { isFilterOpen, filtersCount, closeFilter, policies } = useContext(Context);
  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => closeFilter());

  const providers: string[] = useMemo(() => {
    return Array.from(new Set(policies.map((policy: Policy) => policy.provider)))
  }, [policies]);

  return (
    <>
      {
        isFilterOpen &&
        <div className="bg-white border py-2 rounded-md w-96" ref={ref}>
          <div className="flex items-center justify-between px-4 -y-1">
            <h3 className="font-bold py-3">Filters</h3>
            {filtersCount > 0 && <FilterClearButton />}
          </div>
          <Accordion title="Provider">
            <CheckboxList filterKey="provider" values={providers} />
          </Accordion>
          <Accordion title="Type">
            <CheckboxList filterKey="insuranceType" values={Array.from(Object.values(InsuranceType))} />
          </Accordion>
          <Accordion title="Status">
            <CheckboxList filterKey="status" values={Array.from(Object.values(Status))} />
          </Accordion>
        </div>
      }
    </>
  )
};

export default React.memo(Filter);