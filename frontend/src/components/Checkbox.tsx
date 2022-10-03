import React from "react";
import slugify from "../utils/slugify";

type TCheckbox = React.HTMLAttributes<HTMLDivElement>;

interface IProps {
  checked: boolean;
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Checkbox: React.FC<TCheckbox & IProps> = ({ label, checked, onChange }) => (
  <div>
    <input
      className=""
      checked={checked}
      id={slugify(label)}
      type="checkbox"
      value={label}
      onChange={onChange}
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