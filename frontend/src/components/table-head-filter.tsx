import { FunctionComponent, useMemo } from "react";
import Select, { ActionMeta, MultiValue } from "react-select";
import { useDebouncedCallback } from "use-debounce";
import { MyOptionType, TableHeadFilterProps } from "../models/Table";

const TableHeadFilter: FunctionComponent<TableHeadFilterProps> = ({
  type,
  options = [],
  onFilterChange,
  name,
  selected = [],
  filterState,
}) => {
  const handleChange = (
    data: MultiValue<MyOptionType>,
    actionMeta: ActionMeta<MyOptionType>
  ) => {
    onFilterChange?.(
      name,
      data.map((item) => item.value)
    );
  };

  const handleInputChange = useDebouncedCallback(
    (ev: React.FormEvent<HTMLInputElement>) => {
      const val = (ev.target as HTMLInputElement).value;
      onFilterChange?.(name, val.trim());
    },
    300
  );

  const selectOptions = useMemo(
    () =>
      options?.map((option) => ({
        label: option,
        value: option,
      })),
    [options]
  );

  const selectedValue = useMemo(() => {
    return type === "select"
      ? (filterState?.[name] as string[]).map((item) => ({
          label: item,
          value: item,
        }))
      : [];
  }, [filterState, name, type]);

  return (
    <div
      style={{
        width: "400px",
        display: "flex",
        flexDirection: "column",
        margin: "0.5rem 0",
      }}
    >
      {type === "text" ? (
        <div>
          <input
            type="search"
            onInput={handleInputChange}
            placeholder={`Search ${name}...`}
          />
        </div>
      ) : null}
      {type === "select" ? (
        <Select
          isMulti
          options={selectOptions}
          onChange={handleChange}
          value={selectedValue}
          placeholder={`Filter ${name}...`}
        />
      ) : null}
    </div>
  );
};

export { TableHeadFilter };
