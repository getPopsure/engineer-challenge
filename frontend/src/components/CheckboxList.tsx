import React, { useContext } from "react";
import { Context } from "../context";
import slugify from "../utils/slugify";
import Checkbox from "./Checkbox";

type TCheckboxList = React.HTMLAttributes<HTMLDivElement>;

interface IProps {
  filterKey: string;
  values: string[];
}

const CheckboxList: React.FC<TCheckboxList & IProps> = ({ filterKey, values }) => {
  const { addFilter, removeFilter } = useContext(Context);

  const handleChange = (e: any) => {
    const isChecked = e.target.checked;
    const value = e.target.value;
    if (isChecked) addFilter(filterKey, value);
    else removeFilter(filterKey, value)
  }
  return (
    <fieldset className="flex flex-col">
      {
        values.map(value => (
          <Checkbox key={slugify(value)} label={value} onChange={handleChange} />
        ))
      }
    </fieldset>
  )
};

export default React.memo(CheckboxList);