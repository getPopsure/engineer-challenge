
import './styles.css'

function Table(props: any) {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-lg shadow-sm">
            <table className="min-w-full">
              <Header titles={props.titles} />
              {
                !!props.rows &&
                <Body rows={props.rows} />
              }
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function Header({ titles }: { titles: String[] }) {
  return (
    <thead className="border-b bg-gray-100">
      <tr>
        {
          titles.map((title, key) => (
            <th key={key} scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              {title}
            </th>
          ))
        }
      </tr>
    </thead>
  )
}

function Body({ rows }: { rows: String[][] }) {
  if (rows.length === 0) {
    return (
      <tbody>
        <tr>
          <td className="no-results" colSpan={100}>
            No results found
          </td>
        </tr>
      </tbody>
    )
  }
  return (
    <tbody>
      {
        rows.map((row, key) => (
          <tr className="border-b" key={key}>
            {
              row.map((column, key) => (
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap" key={key}>
                  {column}
                </td>
              ))
            }
          </tr>
        ))
      }
    </tbody>
  )
}

export default Table;