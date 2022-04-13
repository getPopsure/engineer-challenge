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
      />
      <input type="submit" value="Search" />
    </form>
  );
};

export default Search;
