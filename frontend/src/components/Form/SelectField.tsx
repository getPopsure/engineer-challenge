import { ChangeEvent, ReactNode } from "react";
import clsx from 'clsx';
import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";

type Option = {
  label: ReactNode;
  value: string | number | string[];
};

type SelectFieldProps = FieldWrapperPassThroughProps & {
  options: Option[];
  className?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const SelectField = (props: SelectFieldProps) => {
  const { label, options, className, defaultValue, placeholder, onChange } = props;
  return (
    <FieldWrapper label={label}>
      <select
        placeholder={placeholder}
        name="location"
        className={clsx(
          'mt-1 block pl-3 pr-10 py-2 text-base  border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md',
          className
        )}
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {options.map(({ label, value }) => (
          <option key={label?.toString()} value={value}>
            {label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
};

export default SelectField