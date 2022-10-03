import React from "react";
import slugify from "../utils/slugify";

type TCheckbox = React.HTMLAttributes<HTMLDivElement>;

interface IProps {
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Checkbox: React.FC<TCheckbox & IProps> = ({ label, onChange }) => (
  <div>
    <input
      className=""
      id={slugify(label)}
      type="checkbox"
      onChange={onChange}
      value={label}
    />
    <label
      className=""
      htmlFor={slugify(label)}
    >
      {label}
    </label>
  </div>
);

export default React.memo(Checkbox);