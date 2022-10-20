import TableHead from "./TableHead";
import TableRow from "./TableRow";
import { useAppContext } from "../../context/apiContext";

export const Table = () => {
  const { state: { policies } } = useAppContext()

  const filterState = (p) => p
  return (
    <div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-lg shadow-sm">
              <table className="min-w-full">
                <TableHead />
                <tbody>
                {policies.filter((p) => filterState(p)).map((policy: any) =>
                  <TableRow key={policy.id} policy={policy} />
                )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}