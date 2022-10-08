import React, { useContext } from "react";

import Checkbox from "../../Form/Checkbox/Checkbox";

import { Context } from "../../../context";

import slugify from "../../../utils/slugify";

type TCheckboxList = React.HTMLAttributes<HTMLDivElement>;

interface IProps {
  filterKey: string;
  options: { label: string; value: string; }[];
}

const CheckboxList: React.FC<TCheckboxList & IProps> = ({ filterKey, options }) => {
  const { filters, addFilter, removeFilter } = useContext(Context);

  const handleChange = (e: any) => {
    const isChecked = e.target.checked;
    const value = e.target.value;
    if (isChecked) addFilter(filterKey, value);
    else removeFilter(filterKey, value)
  }

  return (
    <fieldset className="flex flex-col">
      {
        options?.map(({ label, value }) => (
          <Checkbox
            key={slugify(value)}
            label={label}
            onChange={handleChange}
            checked={filters[filterKey]?.includes(value)}
            value={value}
          />
        ))
      }
    </fieldset>
  )
};

export default React.memo(CheckboxList);