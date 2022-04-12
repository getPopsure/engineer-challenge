import { ChangeEvent, FormEvent, useState } from "react";

interface SearchProps {
  onSearch: (value: string) => void;
}

const Search = ({ onSearch }: SearchProps) => {
  const [inputValue, setValue] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={inputValue}
        onChange={handleChange}
        placeholder="type here to search..."
      />
      <input type="submit" value="Search" />
      {/* <button onClick={onClear}>Clear x</button> */}
    </form>
  );
};

export default Search;
