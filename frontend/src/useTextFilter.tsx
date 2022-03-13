import React from "react";

export function useTextFilter(): [string, JSX.Element] {
  const [textFilter, setTextFilter] = React.useState("");

  const handleTextChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTimeout(() => setTextFilter(e.target.value), 1000);
    },
    []
  );

  const inputElement = React.useMemo(
    () => (
      <input
        type="search"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5"
        placeholder="Search for items"
        onChange={handleTextChange}
      />
    ),
    [handleTextChange]
  );

  return [textFilter, inputElement];
}
