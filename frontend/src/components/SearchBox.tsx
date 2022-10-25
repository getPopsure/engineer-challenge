import { ChangeEvent, useEffect, useState } from "react";
type SearchBoxProps = {
  onChange: (search: string) => void;
  value: string;
  labelText: string;
  placeholderText: string;
};
const SearchBox = (props: SearchBoxProps) => {
  const [value, setValue] = useState("");
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    props.onChange(e.target.value);
  };
  return (
    <div className="mb-3 xl:w-96">
      <label
        htmlFor="searchInput"
        className="form-label inline-block mb-2 text-gray-700 whitespace-nowrap"
      >
        {props.labelText}:
      </label>
      <input
        id="searchInput"
        aria-label="search"
        type="search"
        placeholder={props.placeholderText}
        value={value}
        onChange={handleOnChange}
        className="w-full px-3 py-1.5 font-normal text-gray-700 border border-solid border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      />
    </div>
  );
};

export default SearchBox;
