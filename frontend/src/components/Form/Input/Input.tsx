import React, { ChangeEventHandler } from "react";

import styles from "./Input.module.scss";

type TInput = React.HTMLAttributes<HTMLDivElement>;

interface IProps {
  placeholder: string,
  type?: string,
  onChange?: ChangeEventHandler<HTMLInputElement>
}

const Input: React.FC<TInput & IProps> = ({ placeholder, type = "text", onChange }) => (
  <div className="px-6">
    <input
      className={styles.input}
      placeholder={placeholder}
      type={type}
      onChange={onChange} />
  </div>
)


export default React.memo(Input);