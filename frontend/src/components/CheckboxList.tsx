import React from "react";
import slugify from "../utils/slugify";

type TCheckboxList = React.HTMLAttributes<HTMLDivElement>;

interface IProps {
  values: string[];
}

const CheckboxList: React.FC<TCheckboxList & IProps> = ({ values }) => (
  <fieldset className="flex flex-col">
    {
      values.map(value => (
        <div key={slugify(value)}>
          <input id={slugify(value)} type="checkbox" />
          <label htmlFor={slugify(value)}>{value}</label>
        </div>
      ))
    }
  </fieldset>
);

export default CheckboxList;