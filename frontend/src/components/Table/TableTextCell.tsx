import Highlighter from "react-highlight-words";

export const TableTextCell = ({
  value,
  searchValue,
}: {
  value: string;
  searchValue?: string;
}) => {
  return (
    <Highlighter
      searchWords={[searchValue]}
      autoEscape={true}
      textToHighlight={value}
    />
  );
};
