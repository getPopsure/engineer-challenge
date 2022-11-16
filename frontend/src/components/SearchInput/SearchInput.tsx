interface ISearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  clearButton?: boolean;
  label?: string;
  id?: string;
}
export const SearchInput: React.FC<ISearchInputProps> = (prop) => {
  const { id, label, className = '', clearButton = false, ...rest } = prop;

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type="text"
        className={`${className} w-full border-2 border-solid h-10 rounded-md`}
        {...rest}
      />
    </div>
  );
};
