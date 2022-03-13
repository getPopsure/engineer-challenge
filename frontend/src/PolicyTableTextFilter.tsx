import React from "react";
import { throttle } from "lodash";

export type PolicyTableTextFilterProps = {
  onFilterChange: (value: string) => void;
};

export default React.memo(function PolicyTableTextFilter({
  onFilterChange,
}: PolicyTableTextFilterProps) {
  return (
    <label>
      <span>Search</span>

      <div className="relative mt-1">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          🔍
        </div>

        <input
          type="search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5"
          placeholder="Search for items"
          onChange={throttle(
            (e: React.ChangeEvent<HTMLInputElement>) =>
              onFilterChange(e.target.value),
            1000
          )}
        />
      </div>
    </label>
  );
});
