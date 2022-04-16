import { ChangeEvent, FormEvent, useState } from "react";

interface SearchProps {
  onSearch: (search: {}) => void;
  onClear: () => void;
}

const Search = ({ onSearch, onClear }: SearchProps) => {
  const [value, setValue] = useState<string>("");
  const [isClearDisabled, setIsClearDisabled] = useState(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch({ search: value });
    setIsClearDisabled(false);
  };

  const handleClear = () => {
    onClear();
    setIsClearDisabled(true);
    setValue("");
  };

  return (
    <div className="flex justify-end flex-col md:flex-row">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row">
        <input
          value={value}
          onChange={handleChange}
          aria-label="Search"
          placeholder="Search"
          className="bg-white h-12 p-4 border rounded-md"
        />
        <button
          disabled={!value}
          className="h-full px-4 py-2 border rounded-md shadow-sm font-medium text-white cursor-pointer disabled:cursor-default bg-purple-500 hover:bg-primary-700 disabled:opacity-50 "
        >
          Search
        </button>
      </form>
      <button
        disabled={isClearDisabled}
        onClick={handleClear}
        className="px-4 py-2 disabled:opacity-50 disabled:cursor-default"
      >
        Clear
      </button>
    </div>
  );
};

export default Search;
