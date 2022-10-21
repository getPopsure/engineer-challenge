import React, { useMemo } from "react";
import { useAppContext } from "../../context/apiContext";
import InputField from "../Form/InputField";
import SelectField from "../Form/SelectField";

const TableHead = () => {
  const { addFilter, state: { providers, status, type } } = useAppContext()

  const handleChange = ({ target }, id) => {
    addFilter(target.value, id)
  }

  const getFilterComponent = (column) => {
    switch (column.filter) {
      case 'text':
        return <InputField onChange={(e) => handleChange(e, column.id)} />
      case 'dropdown':
        return <SelectField
          options={column.options.map(option => ({ label: option, value: option }))}
          onChange={(e) => handleChange(e, column.id)}
        />
      default:
        return null
    }
  }

  const columns = useMemo(() => [
    {
      id: 'id',
      headerName: 'Policy Id',
    },
    {
      id: 'name',
      headerName: 'Name',
      filter: "text",
    },
    {
      id: 'provider',
      headerName: 'Provider',
      filter: "dropdown",
      options: providers,
    },
    {
      id: 'type',
      headerName: 'Type',
      filter: "dropdown",
      options: type,
    },
    {
      id: 'status',
      headerName: 'Status',
      filter: "dropdown",
      options: status,
    },

  ], [providers, status, type])

  return (
    <thead className="border-b bg-gray-100">
    <tr>
      {columns.map(column => {
        return (
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left" key={column.id}>
            {column.headerName}
            {getFilterComponent(column)}
          </th>
        )
        })}
    </tr>
    </thead>
  )
}

export default React.memo(TableHead);