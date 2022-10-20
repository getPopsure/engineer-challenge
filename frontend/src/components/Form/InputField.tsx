import { ChangeEvent } from "react";
import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';
import clsx from 'clsx';

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: 'text' | 'email' | 'password';
  className?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const InputField = (props: InputFieldProps) => {
  const { type = 'text', label, className, placeholder = 'Search ...', onChange } = props;
  return (
    <FieldWrapper label={label}>
      <input
        placeholder={placeholder}
        type={type}
        className={clsx(
          'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
          className
        )}
        onChange={onChange}
      />
    </FieldWrapper>
  );
};

export default InputField