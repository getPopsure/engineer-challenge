import { ChangeEvent, useState } from "react";
type ComboBoxProps = {
  onSearchSubmit: (search: string) => void;
  options: string[];
  labelText: string;
  placeholderText: string;
};
const ComboBox = (props: ComboBoxProps) => {
  const [value, setValue] = useState("");
  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== props.placeholderText) {
      setValue(e.target.value);
      props.onSearchSubmit(e.target.value);
    } else {
      props.onSearchSubmit("");
    }
  };
  return (
    <div className="mb-3 xl:w-96">
      <label
        htmlFor="searchInput"
        className="form-label inline-block mb-2 text-gray-700 whitespace-nowrap"
      >
        {props.labelText}:
      </label>
      <div className="flex justify-left">
        <select
          aria-label={props.labelText}
          onChange={handleOnChange}
          value={value}
          className="px-3 py-1.5 font-normal text-gray-700 border border-solid border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        >
          <option>{props.placeholderText}</option>
          {props.options.map((option, index) => {
            return <option key={index}>{option}</option>;
          })}
        </select>
      </div>
    </div>
  );
};

export default ComboBox;
