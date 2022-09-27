interface SelectProps {
  label: string,
  id: string,
  className: string,
  options?: Array<{
    label: string,
    value: string,
  }>
}

 const Select = ({label, id, options, className}: SelectProps) => {

  return (
    <fieldset className={`${className} d-inline-block`}>
    <label className="mr16 w-auto" htmlFor={id}>{label}</label>
    <select className="p-select" id={id}>
       {options?.flat()
       .map((opt: any) => (
       <option key={opt.value} value={opt.value}>{opt.label}</option>
       ))}
     </select>
    </fieldset>
    )
}

export default Select;