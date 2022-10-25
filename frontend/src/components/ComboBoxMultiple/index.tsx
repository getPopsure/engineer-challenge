import { ChangeEvent, useEffect, useState } from "react";
import { getUniqueId } from "../../helpers/utils";
import * as useClosable from "../../hooks/useClosable";
import styles from "./styles.module.css";

type ComboBoxMultipleProps = {
  onChange: (search: string[]) => void;
  value: string[];
  options: string[];
  labelText: string;
  placeholderText: string;
};
const ComboBoxMultiple = (props: ComboBoxMultipleProps) => {
  const [value, setValue] = useState(new Set<string>());
  const [open, setOpen] = useState(false);
  const id = getUniqueId();

  useEffect(() => {
    let newValue = new Set(props.value);
    setValue(newValue);
  }, [props.value]);

  const handleItemClick = (option: string) => {
    let newValue = new Set(value);
    if (value.has(option)) {
      newValue.delete(option);
    } else {
      newValue.add(option);
    }
    setValue(newValue);
    props.onChange(Array.from(newValue));
  };
  const handleComboBoxClick = (e: ChangeEvent<HTMLInputElement>) => {
    setOpen(e.target.checked);
  };
  useClosable.registerAsClosable(() => setOpen(false));
  return (
    <>
      <div className="mb-3 xl:w-96">
        <label
          htmlFor="searchInput"
          className="form-label inline-block mb-2 text-gray-700 whitespace-nowrap"
        >
          {props.labelText}:
        </label>
        <div
          className={styles.dropdown}
          role="combobox"
          aria-expanded="true"
          aria-controls={`${id}_owned_listbox`}
        >
          <input
            type="checkbox"
            id={id}
            className={styles.hiddenInput}
            role="combobox"
            aria-label={props.labelText}
            aria-controls="owned_listbox"
            aria-expanded="true"
            checked={open}
            onChange={handleComboBoxClick}
          />
          <label
            className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-grey-200 rounded-md shadow-sm text-base cursor-pointer"
            htmlFor={id}
          >
            {props.placeholderText} ▿
          </label>
          <ul
            id={`${id}_owned_listbox`}
            role="listbox"
            className="absolute bg-gray-50 ox-2 py-2 border border-grey-2 rounded-md"
            onClick={(e) => e.stopPropagation()}
          >
            {props.options.map((option, index) => {
              return (
                <li
                  v-for="item in list"
                  key={`${id}_option_${index}`}
                  className="mt-2 ml-3"
                >
                  <div className="w-full flex justify-between items-center">
                    <span className="mr-3">{option}</span>
                    <input
                      data-testid={`${option}-check`}
                      key={`${id}-option-${index}-check`}
                      className="mr-3 cursor-pointer text-lg w-4 h-4 rounded-md"
                      type="checkbox"
                      checked={value.has(option)}
                      onChange={() => handleItemClick(option)}
                      onClick={(e) => e.stopPropagation()}
                    ></input>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ComboBoxMultiple;
