import { useContext } from "react";
import { Context } from "../context";
import slugify from "../utils/slugify";
import FilterBadge from "./FilterBadge";

const FilterList = () => {
  const { filters, filtersCount } = useContext(Context);

  if (filtersCount === 0) return <></>;

  return (
    <>
      {filtersCount &&
        <ul className="flex items-center gap-2">
          {
            Object.entries(filters).map(([filterKey, values]) => {
              return (values as string[]).map((value: string) => (
                <li key={slugify(`${filterKey} ${value}`)}>
                  <FilterBadge filterKey={filterKey} value={value} />
                </li>
              ))
            })
          }
        </ul>
      }
    </>
  )
};


export default FilterList;
