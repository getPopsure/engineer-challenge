export type Option<T> = { value: T; label: string };

interface ISelectInputProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  id?: string;
  options: Option<any>[];
}

export const SelectInput: React.FC<ISelectInputProps> = (props) => {
  const { className = '', label, id, options, ...rest } = props;
  return (
    <div className="flex flex-col">
      {label && <label htmlFor={id}>{label}</label>}
      <select
        className={`${className} w-1/2 border-solid border-2 h-10 rounded-md`}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
