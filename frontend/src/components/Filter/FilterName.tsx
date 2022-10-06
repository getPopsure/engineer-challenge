import React, { useContext } from "react";
import { Context } from "../../context";
import Input from "../Form/Input/Input";

type TTableFilter = React.HTMLAttributes<HTMLDivElement>;

const TableFilter: React.FC<TTableFilter> = () => {
  const { setNameQuery } = useContext(Context);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameQuery(e.target.value.toLowerCase())
  }

  return (
    <Input placeholder="Search" onChange={handleInputChange} />
  )
}

export default React.memo(TableFilter);