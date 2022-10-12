export type TableCell = {
  name: string;
  value: string;
};

export type TableColumn = {
  name: string;
  type?: "text" | "select";
  selectOptions?: string[];
  selected?: string[];
};

export type FilterProps = {
  onFilterChange?: (name: string, value: string[] | string) => void;
  filterState?: { [key: string]: string[] | string | number };
};

export type TableRecord = {
  id: number;
  cells: TableCell[];
};

export type TableProps = {
  records: TableRecord[];
  columns: TableColumn[];
} & FilterProps;

export type TableHeadProps = {
  columns: TableColumn[];
} & FilterProps;

export type TableBodyProps = {
  records: TableRecord[];
};

export type MyOptionType = { label: string; value: string };

export type TableHeadFilterProps = {
  name: string;
  type?: "text" | "select";
  options?: string[];
  selected?: string[];
} & FilterProps;
