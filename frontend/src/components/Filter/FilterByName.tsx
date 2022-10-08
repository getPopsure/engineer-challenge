import React, { useContext } from "react";

import Input from "../Form/Input/Input";

import { Context } from "../../context";

type TFilterByName = React.HTMLAttributes<HTMLDivElement>;

const FilterByName: React.FC<TFilterByName> = () => {
  const { setNameQuery } = useContext(Context);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameQuery(e.target.value)
  }

  return (
    <Input placeholder="Search" onChange={handleInputChange} />
  )
}

export default React.memo(FilterByName);