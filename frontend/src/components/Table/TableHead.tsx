import React, {ChangeEvent, useMemo} from "react";
import { useAppContext } from "../../context/apiContext";
import InputField from "../Form/InputField";
import SelectField from "../Form/SelectField";

const TableHead = () => {
  const { handleNameFilter, state: { providers, status, types } } = useAppContext()
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
  }

  const getFilterComponent = (column) => {
    switch (column.filter) {
      case 'text':
        return <InputField onChange={handleNameFilter} />
      case 'dropdown':
        return <SelectField
          options={column.options.map(option => ({ label: option, value: option }))}
          onChange={handleChange}
        />
      default:
        return null
    }
    // if (!column.filter) return null;
    // if (column.filter === "text") {
    //   return <InputField onChange={handleNameFilter} />
    // }
    // if (column.filter === "dropdown") {
    //   return <SelectField
    //     options={column.options.map(option => ({ label: option, value: option }))}
    //     onChange={handleChange}
    //   />
    // }
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
      options: types,
    },
    {
      id: 'status',
      headerName: 'Status',
      filter: "dropdown",
      options: status,
    },

  ], [providers, status, types])

  return (
    <thead className="border-b bg-gray-100">
    <tr>
      {columns.map(column => {
        // const FilterComponent = getFilterComponent(column);
        return (
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left" key={column.id}>
            {column.headerName}
            {getFilterComponent(column)}
          </th>
        )
        })}
      {/*<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">*/}
      {/*  #*/}
      {/*</th>*/}
      {/*<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">*/}
      {/*  Name*/}
      {/*  <InputField onChange={handleNameFilter} />*/}
      {/*</th>*/}
      {/*<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">*/}
      {/*  Provider*/}
      {/*  <SelectField*/}
      {/*    options={providers.map((type) => ({*/}
      {/*      label: type,*/}
      {/*      value: type,*/}
      {/*    }))}*/}
      {/*    onChange={handleChange}*/}
      {/*  />*/}
      {/*</th>*/}
      {/*<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">*/}
      {/*  Type*/}
      {/*  <SelectField*/}
      {/*    options={types.map((type) => ({*/}
      {/*      label: type,*/}
      {/*      value: type,*/}
      {/*    }))}*/}
      {/*    onChange={handleChange}*/}
      {/*  />*/}
      {/*</th>*/}
      {/*<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">*/}
      {/*  Status*/}
      {/*  <SelectField*/}
      {/*    options={status.map((type) => ({*/}
      {/*      label: type,*/}
      {/*      value: type,*/}
      {/*    }))}*/}
      {/*    onChange={handleChange}*/}
      {/*  />*/}
      {/*</th>*/}
    </tr>
    </thead>
  )
}

export default React.memo(TableHead);