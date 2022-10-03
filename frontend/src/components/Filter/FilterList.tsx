import { useContext } from "react";
import { Context } from "../../context";
import slugify from "../../utils/slugify";
import FilterBadge from "./FilterBadge";
import FilterClearButton from "./FilterClearButton";

const FilterList = () => {
  const { filters, filtersCount } = useContext(Context);

  if (filtersCount === 0) return <></>;

  return (
    <>
      {filtersCount &&
        <div className="flex items-center gap-4">
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
          <FilterClearButton />
        </div>
      }
    </>
  )
};


export default FilterList;
