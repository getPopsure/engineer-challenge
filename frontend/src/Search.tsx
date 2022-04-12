import { ChangeEvent, MouseEvent } from "react";

interface SearchProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearch: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Search = ({ onChange, onSearch }: SearchProps) => {
  return (
    <>
      <input onChange={onChange} placeholder="type here to search..." />
      <button onClick={onSearch}>Search</button>
      {/* <button onClick={onClear}>Clear x</button> */}
    </>
  );
};

export default Search;
