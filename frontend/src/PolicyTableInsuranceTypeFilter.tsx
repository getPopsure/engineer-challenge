import React from "react";
import InsuranceType, { InsuranceTypes } from "./InsuranceType";

export type PolicyTableTextFilterProps = {
  value: string[];
  onFilterChange: (value: string[]) => void;
};

export default React.memo(function PolicyTableTextFilter({
  value,
  onFilterChange,
}: PolicyTableTextFilterProps) {
  const handleFilterChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        onFilterChange([...value, e.target.value]);
      } else {
        onFilterChange(value.filter((v) => v !== e.target.value));
      }
    },
    [value, onFilterChange]
  );

  return (
    <div className="flex flex-col gap-3">
      <span>Insurance Types</span>

      <div className="flex justify-center gap-2">
        <label>
          <input
            className="mr-2"
            type="checkbox"
            value={InsuranceTypes.HEALTH}
            checked={value.includes(InsuranceTypes.HEALTH)}
            onChange={handleFilterChange}
          />

          <InsuranceType type={InsuranceTypes.HEALTH} />
        </label>

        <label>
          <input
            className="mr-2"
            type="checkbox"
            value={InsuranceTypes.HOUSEHOLD}
            checked={value.includes(InsuranceTypes.HOUSEHOLD)}
            onChange={handleFilterChange}
          />

          <InsuranceType type={InsuranceTypes.HOUSEHOLD} />
        </label>

        <label>
          <input
            className="mr-2"
            type="checkbox"
            value={InsuranceTypes.LIABILITY}
            checked={value.includes(InsuranceTypes.LIABILITY)}
            onChange={handleFilterChange}
          />

          <InsuranceType type={InsuranceTypes.LIABILITY} />
        </label>
      </div>
    </div>
  );
});
