import { ChangeEvent } from "react";
type SearchBoxProps = {
  onSearchSubmit: (search: string) => void;
};
const SearchBox = (props: SearchBoxProps) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onSearchSubmit(e.target.value);
  };
  return (
    <div className="flex justify-left">
      <div className="mb-3 xl:w-96">
        <label
          htmlFor="searchInput"
          className="form-label inline-block mb-2 text-gray-700"
        >
          Search:
        </label>
        <input
          id="searchInput"
          aria-label="search"
          type="search"
          placeholder="Search name or provider ..."
          onChange={handleOnChange}
          className="w-full px-3 py-1.5 font-normal text-gray-700 border border-solid border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default SearchBox;
