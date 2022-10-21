import TableHead from "./TableHead";
import TableRow from "./TableRow";
import { useAppContext } from "../../context/apiContext";
import { TPolicy } from "../../types";

export const Table = () => {
  const { state: { policies } } = useAppContext()

  return (
    <div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-lg shadow-sm">
              <table className="min-w-full">
                <TableHead />
                <tbody>
                {policies.length > 0 ? (
                  policies.map((policy: TPolicy) =>
                      <TableRow key={policy.id} policy={policy} />
                    )
                ) : <p>There are no policies matching the criteria !</p>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}