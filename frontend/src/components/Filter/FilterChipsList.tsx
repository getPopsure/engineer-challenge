import React, { useContext } from "react";

import FilterChip from "./FilterBadge";
import FilterClearButton from "./FilterClearButton";

import { Context } from "../../context";

import slugify from "../../utils/slugify";

const FilterChipsList = () => {
  const { filters } = useContext(Context);


  return (
    <>
      <div className="flex items-center gap-4">
        {
          Object.entries(filters).length > 0 &&
          <>
            <ul className="flex items-center gap-2">
              {
                Object.entries(filters).map(([filterKey, values]) => {
                  return (values as string[]).map((value: string) => (
                    <li key={slugify(`${filterKey} ${value}`)}>
                      <FilterChip filterKey={filterKey} value={value} />
                    </li>
                  ))
                })
              }
            </ul>
            <FilterClearButton />
          </>
        }
      </div>
    </>
  )
};


export default React.memo(FilterChipsList);
