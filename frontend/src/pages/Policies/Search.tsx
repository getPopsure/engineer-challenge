import { ChangeEvent, FormEvent } from "react";

interface SearchProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

const Search = ({ value, onChange, onSearch }: SearchProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch();
  };
  return (
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
  );
};

export default Search;
