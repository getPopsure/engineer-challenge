import React from "react";

import styles from "./Checkbox.module.scss";

import slugify from "../../../utils/slugify";

type TCheckbox = React.HTMLAttributes<HTMLDivElement>;

interface IProps {
  checked: boolean;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Checkbox: React.FC<TCheckbox & IProps> = ({ label, checked, value, onChange }) => (
  <div>
    <input
      className={styles.checkbox}
      checked={checked}
      id={slugify(label)}
      type="checkbox"
      value={value}
      onChange={onChange}
    />
    <label htmlFor={slugify(label)}>{label}</label>
  </div>
);

export default React.memo(Checkbox);