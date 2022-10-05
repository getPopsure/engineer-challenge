interface SelectProps {
  label: string,
  id: string,
  name: string,
  className: string,
  onChange?: React.ChangeEventHandler,
  options?: Array<{
    label: string,
    value: string,
  }>
}

 const Select = ({label, name, id, options, className, onChange}: SelectProps) => {

  return (
    <fieldset className={`${className} d-inline-block`}>
    <label className="mr16 w-auto" htmlFor={id}>{label}</label>
    <select name={name} className="p-select" id={id} onChange={onChange}>
      <option value=""></option>
       {options?.flat()
       .map((opt: any) => (
       <option key={opt.value} value={opt.value}>{opt.label}</option>
       ))}
     </select>
    </fieldset>
    )
}

export default Select;