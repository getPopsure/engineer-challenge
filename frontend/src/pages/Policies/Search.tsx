import { ChangeEvent, FormEvent, useState } from "react";

interface SearchProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  onSearchClear: () => void;
}

const Search = ({ value, onChange, onSearch, onSearchClear }: SearchProps) => {
  const [isClearDisabled, setIsClearDisabled] = useState(!value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch();
    setIsClearDisabled(!value);
  };

  return (
    <div className="flex justify-end">
      <form onSubmit={handleSubmit}>
        <input
          value={value}
          onChange={onChange}
          placeholder="type here to search..."
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
        onClick={onSearchClear}
        disabled={isClearDisabled}
        className="px-4 py-2 disabled:opacity-50 disabled:cursor-default"
      >
        Clear
      </button>
    </div>
  );
};

export default Search;
